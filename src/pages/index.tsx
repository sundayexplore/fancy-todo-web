import React, { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { useRouter } from 'next/router';
import AOS from 'aos';

import reduxStore from '@/redux';
import { AppLayout } from '@/components';
// import { MainBanner, DemoBanner } from '@/components/home';

export interface IHomeProps {}

export default function Home({}: IHomeProps) {
  const router = useRouter();

  useEffect(() => {
    AOS.init();
    router.push('/signin');
  }, []);

  return (
    <ReduxProvider store={reduxStore}>
      <AppLayout>
        <h1>THIS IS HOME</h1>
      </AppLayout>
    </ReduxProvider>
  );
};
