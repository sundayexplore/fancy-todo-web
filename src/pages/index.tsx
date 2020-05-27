import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import AOS from 'aos';
import { initializeIcons } from '@uifabric/icons'

import store from '@/stores';
import { AppLayout } from '@/components';
import { MainBanner, DemoBanner } from '@/components/home';

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    AOS.init();
    initializeIcons();

    if (localStorage.user) {
      setUser(localStorage.user);
    }
  }, []);

  const render = () => {
    if (user) {
      router.push('/dashboard');
    } else {
      return (
        <AppLayout>
          <MainBanner />
          <DemoBanner />
        </AppLayout>
      );
    }
  };

  return (
    <Provider store={store}>
      {render()}
    </Provider>
  );
};
