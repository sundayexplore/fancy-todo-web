import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Stack, getTheme, PrimaryButton } from '@fluentui/react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { IRootState, ITodo } from '@/types';
import {
  DemoTodoItem,
  DemoTodoListHeader,
  DemoTodoModal,
} from '@/components/demo';
import useGlobalStyles from '@/styles';

import NoTodosIllustrationSVG from '@/assets/svgs/todos/no-todos-illustration.svg';

export interface IDemoTodoListProps {}

export default function DemoTodoList(props: IDemoTodoListProps) {
  const globalClasses = useGlobalStyles();
  const classes = useStyles();
  const todos: ITodo[] = useSelector((state: IRootState) => state.demo.todos);
  const [demoTodoModalData, setDemoTodoModalData] = useState({
    type: 'add',
    currentTodo: {} as ITodo,
  });
  const [showTodoModal, setShowTodoModal] = useState(false);

  const handleTodoModal = (
    action: 'open' | 'close',
    type: 'add' | 'update' | 'delete' = 'add',
    todo: ITodo = {} as ITodo
  ): void => {
    switch (action) {
      case 'open':
        setDemoTodoModalData({
          ...demoTodoModalData,
          type: type,
          currentTodo: todo,
        });
        setShowTodoModal(true);
        break;

      case 'close':
        setDemoTodoModalData({
          ...demoTodoModalData,
          type: 'add',
          currentTodo: {} as ITodo,
        });
        setShowTodoModal(false);
        break;
    }
  };

  const decideRenderTodos = () => {
    if (todos.length) {
      return todos.map((todo: ITodo) => {
        return <DemoTodoItem todo={todo} />;
      });
    } else {
      return (
        <Stack.Item className={classes.noTodosBanner}>
          <NoTodosIllustrationSVG />
          <h3>You don't have a todo yet. Click to create one!</h3>
          <PrimaryButton
            className={`${globalClasses.primaryButton} ${classes.addTodoBtn}`}
            onClick={() => handleTodoModal('open')}
          >
            Add Todo
          </PrimaryButton>
        </Stack.Item>
      );
    }
  };

  return (
    <>
      <Stack className={classes.todoListWrapper}>
        <DemoTodoListHeader />
        <Stack className={classes.todoList}>{decideRenderTodos()}</Stack>
      </Stack>
      <DemoTodoModal
        type={demoTodoModalData.type}
        todo={demoTodoModalData.currentTodo}
        show={showTodoModal}
        onDismiss={() => handleTodoModal('close')}
      />
    </>
  );
}

const theme = getTheme();
const useStyles = makeStyles(() =>
  createStyles({
    todoListWrapper: {
      width: '100%',
      height: '100%',
      minHeight: '45ch',
    },
    todoList: {
      height: '100%',
      border: `4px solid ${theme.palette.blueLight}`,
      // borderRadius: '0 0 8px 8px',
      overflow: 'auto',
    },
    noTodosBanner: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    addTodoBtn: {
      
    },
  })
);
