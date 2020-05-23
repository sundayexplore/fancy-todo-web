import React from 'react';
import { useSelector } from 'react-redux';
import { Stack, getTheme } from '@fluentui/react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { IRootState, ITodo } from '@/types';
import { DemoTodoItem } from '@/components/demo';

export interface IDemoTodoListProps {}

export default function DemoTodoList(props: IDemoTodoListProps) {
  const classes = useStyles();
  const todos: ITodo[] = useSelector((state: IRootState) => state.demo.todos);

  const decideRenderTodos = () => {
    if (todos.length) {
      return todos.map((todo: ITodo) => {
        return <DemoTodoItem todo={todo} />;
      });
    } else {
      return (
        <div className={classes.noTodosBanner}>
          No TODOSSSSSS!!
        </div>
      );
    }
  }

  return (
    <Stack className={classes.todoListWrapper}>
      {decideRenderTodos()}
    </Stack>
  );
};

const theme = getTheme();
const useStyles = makeStyles(() => createStyles({
  todoListWrapper: {},
  noTodosBanner: {}
}));
