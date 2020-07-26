import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { AppLayout, TodoList } from '@/components';
import { userAPI } from '@/utils';

// Redux Actions
import { setUser } from '@/redux/actions/user-actions';
import { setTodos } from '@/redux/actions/todo-actions';

export default function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const syncUser = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await userAPI.get('/sync');
      localStorage.setItem('user', JSON.stringify(data.user));
      dispatch(setUser(data.user));
      dispatch(setTodos(data.todos));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      // handle here
    }
  }, []);

  useEffect(() => {
    syncUser();
  }, []);

  return <AppLayout>{loading ? <div>LOADING</div> : <TodoList />}</AppLayout>;
}

const useStyles = makeStyles((theme: Theme) => createStyles({}));
