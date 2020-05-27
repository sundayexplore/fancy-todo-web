import React from 'react';
import { getTheme } from '@fluentui/react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { DemoTodoList } from '@/components/demo';

export interface IDemoBannerProps {}

export default function DemoBanner(props: IDemoBannerProps) {
  const classes = useStyles();

  return (
    <section className={classes.demoBannerWrapper}>
      <DemoTodoList />
    </section>
  );
};

const theme = getTheme();
const useStyles = makeStyles(() => createStyles({
  demoBannerWrapper: {
    width: '100%',
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    justifyItems: 'center',
    alignContent: 'center'
  }
}));
