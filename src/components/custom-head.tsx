import React, { ReactNode } from 'react';
import Head from 'next/head';

export interface IHeadProps {
  title?: string;
  children?: ReactNode;
}

export default function CustomHead(props: IHeadProps) {
  const { title, children } = props;
  
  return (
    <Head>
      {children}
      <title> { `${title} | Fancy Todo` } </title>
    </Head>
  );
};
