import React, { ReactNode } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { Header, Footer } from '@/components';

export interface IAppLayoutProps {
  children: ReactNode;
}

export default function AppLayout(props: IAppLayoutProps) {
  const { children } = props;
  const classes = useStyles();

  return (
    <>
      <Header />
      <main className={classes.mainContainer}>
        {children}
      </main>
      <Footer />
    </>
  );
};

const useStyles = makeStyles(() => createStyles({
  mainContainer: {
    marginTop: '8ch',
    paddingTop: '2ch',
    '& > section': {
      margin: '10ch 0'
    }
  }
}));
