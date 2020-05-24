import React from 'react';
import moment from 'moment';

import { ITodo } from '@/types';
import { wrapRender } from '@/components';
import { DemoTodoList, DemoTodoListHeader, DemoTodoItem } from '@/components/demo';

const mockTodo: ITodo = {
  _id: 1,
  name: 'Example Todo',
  dueDate: moment().toDate(),
  completed: false
}

export default {
  title: 'Fancy Todo Demo',
  component: DemoTodoList
};

export const TodoList = () => wrapRender(<DemoTodoList />);

export const TodoListHeader = () => wrapRender(<DemoTodoListHeader />);

export const TodoItem = () => wrapRender(<DemoTodoItem todo={mockTodo} />);
