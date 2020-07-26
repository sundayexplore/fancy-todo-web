import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import AOS from 'aos';

// Redux Store
import reduxStore from '@/redux';

// Styles
import '@/styles/global.scss';
import { muiTheme } from '@/styles';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <ReduxProvider store={reduxStore}>
        <Component {...pageProps} />
      </ReduxProvider>
    </MuiThemeProvider>
  );
}
