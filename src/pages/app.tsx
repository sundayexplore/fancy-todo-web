import React from 'react';
// import { useDispatch } from 'react-redux';
// import { useRouter } from 'next/router';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { AppLayout, TodoList } from '@/components';
// import { userAPI } from '@/utils';

// Redux Actions
// import { setUser } from '@/redux/actions/user-actions';
// import { setTodos } from '@/redux/actions/todo-actions';

import { AppHeader } from '@/components/app-components';

export interface IAppProps {}

export default function App({}: IAppProps) {
  return (
    <AppLayout>
      <TodoList />
    </AppLayout>
  );
}

// const useStyles = makeStyles(() => createStyles({}));
