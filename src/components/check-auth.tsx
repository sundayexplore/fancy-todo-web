import React, { useEffect, useState, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { LinearProgress } from '@material-ui/core';

export interface ICheckAuthProps {
  children?: ReactElement;
}

export default function CheckAuth({ children }: ICheckAuthProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setLoading(false)
      router.replace('/app');
    }
  }, []);

  return loading ? (
    <>
      <LinearProgress />
    </>
  ) : children as ReactElement<any>;
}
