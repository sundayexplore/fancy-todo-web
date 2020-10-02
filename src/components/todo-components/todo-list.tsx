import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import moment from 'moment';

import TodoCard from './todo-card';
import BlankTodoCard from './blank-todo-card';

import { ITodo } from '@/typings';

export interface ITodoListProps {
  todos: ITodo[];
}

export default function TodoList({ todos = [] as ITodo[] }: ITodoListProps) {
  const classes = useStyles();

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
        .filter((todo) => todo.completed === false)
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
