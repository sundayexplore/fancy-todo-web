import React, { useEffect, useCallback, useState } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';
import AOS from 'aos';

import { Loading } from '@/components';

// Redux Store
import reduxStore from '@/redux';

// Styles
import '@/styles/global.scss';
import { muiTheme } from '@/styles';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  const checkAuthWithUseCallback = useCallback(async () => {
    if (router.pathname === '/signup' || router.pathname === '/signin') {
      if (localStorage.getItem('user')) {
        await router.replace('/app');
      }
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    AOS.init();
    checkAuthWithUseCallback();
  }, []);

  return (
    <ReduxProvider store={reduxStore}>
      <MuiThemeProvider theme={muiTheme}>
        {loading ? <Loading /> : <Component {...pageProps} />}
      </MuiThemeProvider>
    </ReduxProvider>
  );
}
