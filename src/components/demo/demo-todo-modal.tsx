import React from 'react';

import { ITodo } from '@/types';
import { DemoTodoForm } from '@/components/demo';

export interface IDemoTodoModal {
  type: 'add' | 'update' | 'delete' | string;
  todo: ITodo;
}

export default function DemoTodoModal(props: IDemoTodoModal) {
  const { type } = props;

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
    <section>
      {decideRender()}
    </section>
  );
};
