import React from 'react';

import '../styles/global.scss';

export interface IAppProps {
  Component: any;
  pageProps: any;
}

export default function App(props: IAppProps) {
  const { Component, pageProps } = props;
  return (
    <Component {...pageProps} />
  );
};
