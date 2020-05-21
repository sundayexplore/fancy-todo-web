import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { AppLayout } from '../components';

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
          <h1>this is home</h1>
        </AppLayout>
      );
    }
  };

  return render();
};
