import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useCookies } from 'react-cookie';
import moment from 'moment';

import { Loading, AppLayout, TodoList } from '@/components';
import { userAPI } from '@/utils';

// Redux Actions
import { setUser } from '@/redux/actions/user-actions';
import { setTodos as setTodosRedux } from '@/redux/actions/todo-actions';
import { setWarning, setError } from '@/redux/actions/snackbar-actions';

// Typings
import { IRootState, ITodo } from '@/typings';

// Utils
import { capitalize } from '@/utils';

export interface IAppProps {}

export default function App({}: IAppProps) {
  const [cookies] = useCookies(['rft']);
  const router = useRouter();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(true);
  const [todos, setTodos] = useState<ITodo[]>([] as ITodo[]);
  const { selectedTodoCategory } = useSelector(
    (state: IRootState) => state.current,
  );
  const { todos: todosFromRedux } = useSelector(
    (state: IRootState) => state.todo,
  );

  const syncWithUseCallback = useCallback(async (): Promise<void> => {
    try {
      const { data } = await userAPI.get('/sync');

      dispatch(setUser(data.user));
      dispatch(setTodosRedux(data.todos));
      setLoading(false);
    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 401:
            try {
              if (cookies['rft'] && cookies['rft'].length > 0) {
                await userAPI.post('/refresh');
                const { data: syncData } = await userAPI.get('/sync');
                dispatch(setUser(syncData.user));
                dispatch(setTodosRedux(syncData.Todos));
                setLoading(false);
              } else {
                setLoading(false);
                await router.push('/signin');
                dispatch(setWarning(`Please sign in to continue`));
              }
            } catch (err2) {
              if (err.response) {
                setLoading(false);
                await router.push('/signin');
                dispatch(setError(err2.response.data.message));
              }
            }
            break;

          default:
            setLoading(false);
            dispatch(setError(err.response.data.message));
            break;
        }
      } else if (err.message) {
        setLoading(false);
        dispatch(setError(err.message));
      } else {
        setLoading(false);
        dispatch(setError(`Unknown error has occurred!`));
        // Report bugs action (soon)
      }
    }
  }, []);

  useEffect((): void => {
    syncWithUseCallback();
  }, []);

  useEffect((): void => {
    switch (selectedTodoCategory.toLowerCase()) {
      case 'today':
        setTodos(
          [...todosFromRedux].filter((todo) =>
            moment(todo.due).isSame(moment(), 'day'),
          ),
        );
        break;

      case 'upcoming':
        setTodos(
          [...todosFromRedux].filter((todo) =>
            moment(todo.due).isAfter(moment(), 'day'),
          ),
        );
        break;
    }
  }, [selectedTodoCategory, todosFromRedux]);

  const decideRender = (): JSX.Element => {
    const overdueTodos = todosFromRedux.filter((todo) =>
      moment(todo.due).isBefore(moment(), 'day'),
    );

    if (overdueTodos.length > 0 && selectedTodoCategory === 'today') {
      return (
        <>
          <TodoList
            header={capitalize('overdue')}
            todos={overdueTodos}
            addTodoCard={false}
          />
          <TodoList header={capitalize(selectedTodoCategory)} todos={todos} />
        </>
      );
    }

    return <TodoList header={capitalize(selectedTodoCategory)} todos={todos} />;
  };

  return <>{loading ? <Loading /> : <AppLayout>{decideRender()}</AppLayout>}</>;
}

const useStyles = makeStyles(() => createStyles({}));
