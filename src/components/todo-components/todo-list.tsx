import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { IRootState } from '@/types';
import TodoCard from './todo-card';

export interface ITodoListProps {}

export default function TodoList({}: ITodoListProps) {
  const classes = useStyles();
  const { selectedTodoCategory } = useSelector((state: IRootState) => state.current);
  const { todos } = useSelector((state: IRootState) => state.todo);

  return (
    <>
      <Grid container classes={{ container: classes.todoListWrapper }}>
        {todos.map((todo) => (
          <Grid item key={todo._id}>
            <TodoCard todo={todo} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    todoListWrapper: {},
  }),
);
