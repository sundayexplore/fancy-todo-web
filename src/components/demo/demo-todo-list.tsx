import React from 'react';
import { useSelector } from 'react-redux';
import { Stack, getTheme } from '@fluentui/react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { IRootState, ITodo } from '@/types';
import { DemoTodoItem, DemoTodoListHeader } from '@/components/demo';

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
        <Stack.Item className={classes.noTodosBanner}>
          No TODOSSSSSS!!
        </Stack.Item>
      );
    }
  }

  return (
    <Stack className={classes.todoListWrapper}>
      <DemoTodoListHeader />
      <Stack className={classes.todoList}>
        {decideRenderTodos()}
      </Stack>
    </Stack>
  );
};

const theme = getTheme();
const useStyles = makeStyles(() => createStyles({
  todoListWrapper: {
    gridColumn: 2,
    width: '100%',
    height: '100vh',
  },
  todoList: {
    height: '100%',
    border: `4px solid ${theme.palette.blueLight}`,
    borderRadius: '0 0 8px 8px'
  },
  noTodosBanner: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));
