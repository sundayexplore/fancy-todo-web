import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Stack, getTheme } from '@fluentui/react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { IRootState, ITodo } from '@/types';
import { DemoTodoItem, DemoTodoListHeader, DemoTodoModal } from '@/components/demo';

import NoTodosIllustrationSVG from '@/assets/svgs/todos/no-todos-illustration.svg';

export interface IDemoTodoListProps {}

export default function DemoTodoList(props: IDemoTodoListProps) {
  const classes = useStyles();
  const todos: ITodo[] = useSelector((state: IRootState) => state.demo.todos);
  const [demoTodoModalData, setDemoTodoModalData] = useState({
    type: 'add',
    currentTodo: {} as ITodo
  });

  const handleTodoModal = (type: 'add' | 'update' | 'delete', todo: ITodo, action: 'open' | 'close'): void => {
    switch (action) {
      case 'open':
        setDemoTodoModalData({
          ...demoTodoModalData,
          type,
          currentTodo: todo
        });
        break;
    
      case 'close':
        setDemoTodoModalData({
          ...demoTodoModalData,
          type: 'add',
          currentTodo: {} as ITodo
        });
        break;
    }
  }

  const decideRenderTodos = () => {
    if (todos.length) {
      return todos.map((todo: ITodo) => {
        return <DemoTodoItem todo={todo} />;
      });
    } else {
      return (
        <Stack.Item className={classes.noTodosBanner}>
          <NoTodosIllustrationSVG />
        </Stack.Item>
      );
    }
  }

  /**
   * TODO:
   * Add handler for modal into the header and each item.
   */

  return (
    <>
      <Stack className={classes.todoListWrapper}>
        <DemoTodoListHeader />
        <Stack className={classes.todoList}>
          {decideRenderTodos()}
        </Stack>
      </Stack>
      <DemoTodoModal type={demoTodoModalData.type} todo={demoTodoModalData.currentTodo} />
    </>
  );
};

const theme = getTheme();
const useStyles = makeStyles(() => createStyles({
  todoListWrapper: {
    width: '100%',
    height: '100%',
    minHeight: '45ch'
  },
  todoList: {
    height: '100%',
    border: `4px solid ${theme.palette.blueLight}`,
    borderRadius: '0 0 8px 8px',
    overflow: 'auto'
  },
  noTodosBanner: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));
