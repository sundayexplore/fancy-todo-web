import { IAction, ITodo } from '@/types';

export const demoAddTodo = (todo: ITodo): IAction => ({
  type: 'DEMO_ADD_TODO',
  payload: {
    todo
  }
});

export const demoCompleteTodo = (todo: ITodo): IAction => ({
  type: 'DEMO_COMPLETE_TODO',
  payload: {
    todo
  }
});

export const demoUncompleteTodo = (todo: ITodo): IAction => ({
  type: 'DEMO_UNCOMPLETE_TODO',
  payload: {
    todo
  }
});

export const demoUpdateTodo = (todo: ITodo): IAction => ({
  type: 'DEMO_UPDATE_TODO',
  payload: {
    todo
  }
});

export const demoDeleteTodo = (todo: ITodo): IAction => ({
  type: 'DEMO_DELETE_TODO',
  payload: {
    todo
  }
});
