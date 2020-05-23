import React from 'react';

import { ITodo } from '@/types';

export interface IDemoTodoForm {
  type: 'add' | 'update';
  todo?: ITodo;
}

export default function DemoTodoForm(props: IDemoTodoForm) {
  const { type, todo } = props;

  return (
    <h1>This is DEMO TODO FORM!</h1>
  );
};
