import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardActions } from '@material-ui/core';

// import { ITodo } from '@/types';

export interface ITodoCardProps {
  // todo: ITodo;
}

export default function TodoCard({ }: ITodoCardProps) {
  const classes = useStyles();

  return (
    <Card classes={{ root: classes.todoCard }}>
      <CardContent classes={{ root: classes.todoCardContent }}></CardContent>
      <CardActions classes={{ root: classes.todoCardActions }}></CardActions>
    </Card>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    todoCard: {},
    todoCardContent: {},
    todoCardActions: {},
  }),
);
