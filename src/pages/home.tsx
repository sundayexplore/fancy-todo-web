import React from 'react';

import { Layout } from '@/components';

export interface IHomeProps {}

export default function Home({}: IHomeProps) {
  return (
    <Layout title={`Home`}>
      <h1>THIS IS HOME</h1>
    </Layout>
  );
}
