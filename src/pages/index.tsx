import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { AppLayout } from '../components';
import { MainBanner } from '@/components/home';

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
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
        </AppLayout>
      );
    }
  };

  return render();
};
