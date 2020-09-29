import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import moment from 'moment';

import { IRootState } from '@/typings';
import TodoCard from './todo-card';
import BlankTodoCard from './blank-todo-card';

export interface ITodoListProps {}

export default function TodoList({}: ITodoListProps) {
  const classes = useStyles();
  // const { selectedTodoCategory } = useSelector((state: IRootState) => state.current);
  const { todos } = useSelector((state: IRootState) => state.todo);

  return (
    <Grid
      container
      classes={{ container: classes.todoListWrapper }}
      spacing={5}
      wrap={`wrap`}
      justify={`flex-start`}
      alignItems={`center`}
    >
      {todos
        .filter(
          (todo) =>
            todo.completed === false &&
            moment(todo.due).isSame(moment(), 'day'),
        )
        .map((todo) => (
          <Grid item key={todo._id}>
            <TodoCard todo={todo} mode={`show`} />
          </Grid>
        ))}

      <Grid item>
        <BlankTodoCard />
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    todoListWrapper: {},
  }),
);
