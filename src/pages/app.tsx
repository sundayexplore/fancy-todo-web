import React from 'react';

import { AppHeader } from '@/components/app-components';

export interface IAppProps {}

export default function App({}: IAppProps) {
  return (
    <>
      <AppHeader />
    </>
  );
}
