import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { getTheme, Dialog } from '@fluentui/react';

import { ITodo } from '@/types';
import { DemoTodoForm } from '@/components/demo';

export interface IDemoTodoModal {
  type: 'add' | 'update' | 'delete' | string;
  todo: ITodo;
  show: boolean;
  onDismiss: () => void
}

export default function DemoTodoModal({ type, todo, show, onDismiss }: IDemoTodoModal) {
  const classes = useStyles();

  const decideRender = () => {
    switch (type) {
      case 'add':
        return <DemoTodoForm type="add" />
    
      case 'update':
        return <DemoTodoForm type="update" />

      case 'delete':
        return (
          <div>THIS IS DELETE TODO!</div>
        );
    }
  }

  return (
    <Dialog
      hidden={!show}
      onDismiss={onDismiss}
    >
      {decideRender()}
    </Dialog>
  );
};

const theme = getTheme();
const useStyles = makeStyles(() => createStyles({
  demoTodoModalWrapper: {}
}));
