import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { Layout } from '@/components';

export interface IHomeProps {}

export default function Home({}: IHomeProps) {
  return (
      <Layout>
        <h1>THIS IS HOME</h1>
      </Layout>
  );
};
