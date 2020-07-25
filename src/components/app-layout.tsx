import React, { ReactNode } from 'react';
import { makeStyles, createStyles, MuiThemeProvider } from '@material-ui/core/styles';

import { Header, Footer } from '@/components';
import { muiTheme } from '@/styles';

export interface IAppLayoutProps {
  children: ReactNode;
}

export default function AppLayout(props: IAppLayoutProps) {
  const { children } = props;
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={muiTheme}>
      <Header />
      <main className={classes.mainContainer}>
        {children}
      </main>
      <Footer />
    </MuiThemeProvider>
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
