import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '@fluentui/react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

export interface IDemoBannerProps {}

export default function DemoBanner(props: IDemoBannerProps) {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <section className={classes.demoBannerWrapper}></section>
  );
};

const theme = getTheme();
const useStyles = makeStyles(() => createStyles({
  demoBannerWrapper: {
    width: '100%'
  }
}));
