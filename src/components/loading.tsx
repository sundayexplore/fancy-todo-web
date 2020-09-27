import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { LinearProgress, Grid } from '@material-ui/core';
import { AssignmentTurnedIn as AssignmentTurnedInIcon } from '@material-ui/icons';

import Container from './container';

export interface ILoadingProps {}

export default function Loading({}: ILoadingProps) {
  const classes = useStyles();

  return (
    <Container>
      <Grid
        container
        classes={{ root: classes.loadingWrapper }}
        justify={`center`}
        alignContent={`center`}
        direction={`column`}
      >
        <Grid item>
          <AssignmentTurnedInIcon color={`primary`} fontSize={`large`} />
        </Grid>
        <Grid>
          <LinearProgress />
        </Grid>
      </Grid>
    </Container>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    loadingWrapper: {
    },
  }),
);
