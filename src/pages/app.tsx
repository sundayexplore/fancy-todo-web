import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useCookies } from 'react-cookie';

import { Loading, AppLayout, TodoList } from '@/components';
import { userAPI } from '@/utils';

// Redux Actions
import { setUser } from '@/redux/actions/user-actions';
import { setTodos } from '@/redux/actions/todo-actions';
import { setWarning, setError } from '@/redux/actions/snackbar-actions';

export interface IAppProps {}

export default function App({}: IAppProps) {
  const [cookies] = useCookies(['rft']);
  const router = useRouter();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(true);

  const syncWithUseCallback = useCallback(async (): Promise<void> => {
    try {
      const { data } = await userAPI.get('/sync');

      dispatch(setUser(data.user));
      dispatch(setTodos(data.todos));
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
                dispatch(setTodos(syncData.Todos));
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
      }
    }
  }, []);

  useEffect(() => {
    syncWithUseCallback();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <AppLayout>
          <TodoList />
        </AppLayout>
      )}
    </>
  );
}

const useStyles = makeStyles(() => createStyles({}));
