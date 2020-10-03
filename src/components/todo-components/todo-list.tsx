import React, { ComponentType } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import TodoCard from './todo-card';
import BlankTodoCard from './blank-todo-card';

import { ITodo } from '@/typings';

export interface ITodoListProps {
  todos: ITodo[];
  header: string | ComponentType;
  addTodoCard?: boolean;
}

export default function TodoList({
  todos = [] as ITodo[],
  addTodoCard = true,
  header: Header,
}: ITodoListProps) {
  const classes = useStyles();

  const renderHeader = () => {
    if ((Header as string).length > 0) {
      return (
        <Grid item>
          <Typography>{Header}</Typography>
        </Grid>
      );
    }

    return (
      <Grid item>
        <Header />
      </Grid>
    );
  };

  return (
    <Grid
      container
      direction={`column`}
      wrap={`nowrap`}
      justify={`center`}
      alignItems={`stretch`}
    >
      {renderHeader()}

      <Grid
        item
        container
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

        {addTodoCard ? (
          <Grid item>
            <BlankTodoCard />
          </Grid>
        ) : (
          ''
        )}
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    todoListWrapper: {},
  }),
);
