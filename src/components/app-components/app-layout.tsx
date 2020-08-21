import React, { ReactNode } from 'react';
// import { makeStyles, createStyles } from '@material-ui/core/styles';

import AppHeader from './app-header';

export interface IAppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: IAppLayoutProps) {
  // const classes = useStyles();
  
  return (
    <>
      <AppHeader />
      {children}
    </>
  )
}

// const useStyles = makeStyles(() => createStyles({}));
