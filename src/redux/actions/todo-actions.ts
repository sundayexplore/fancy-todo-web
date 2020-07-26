import { IAction, ITodo } from '@/types';

export const setTodos = (todos: ITodo[]): IAction => ({
  type: 'SET_TODOS',
  payload: {
    todos,
  },
});
