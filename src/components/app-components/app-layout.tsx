import React, { ReactNode } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import AppHeader from './app-header';

export interface IAppLayoutProps {
  appChildren: ReactNode;
}

export default function AppLayout({ appChildren }: IAppLayoutProps) {
  const classes = useStyles();
  
  return (
    <>
      <AppHeader />
      {appChildren}
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => createStyles({}));
