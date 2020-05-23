import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTheme, Stack, Checkbox, FontIcon } from '@fluentui/react';
import { makeStyles, createStyles } from '@material-ui/core';
import moment from 'moment';

import { ITodo } from '@/types';
import { demoCompleteTodo, demoUncompleteTodo } from '@/actions/demo';

export interface IDemoTodoItem {
  todo: ITodo;
}

export default function DemoTodoItem(props: IDemoTodoItem) {
  const { todo } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const onCheckboxChange = (
    e?: FormEvent<HTMLElement | HTMLInputElement>,
    checked?: boolean
  ) => {
    switch (checked) {
      case false:
        dispatch(demoUncompleteTodo(todo));
        break;

      default:
        dispatch(demoCompleteTodo(todo));
        break;
    }
  };

  return (
    <Stack.Item className={classes.demoTodoItem}>
      <Checkbox className={classes.todoCheckbox} checked={todo.completed} onChange={onCheckboxChange} />
      <div className={classes.todoDetails}>
        <div className={classes.todoName}>{todo.name}</div>
        <div className={classes.todoDate}>{moment(todo.dueDate).format('LT')}</div>
      </div>
      <FontIcon iconName="EditNote" className={classes.editIcon} />
    </Stack.Item>
  );
}

const theme = getTheme();
const useStyles = makeStyles(() =>
  createStyles({
    demoTodoItem: {
      width: '100%',
      padding: '1ch'
    },
    todoCheckbox: {},
    todoDetails: {},
    todoName: {},
    todoDate: {},
    editIcon: {}
  })
);