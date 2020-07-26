import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { Layout } from '@/components';

export interface IHomeProps {}

export default function Home({}: IHomeProps) {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      router.push('/app');
    }
  }, []);

  return (
      <Layout>
        <h1>THIS IS HOME</h1>
      </Layout>
  );
};
