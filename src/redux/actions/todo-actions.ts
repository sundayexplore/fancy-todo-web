import { IAction, ITodo } from '@/types';

export const setTodos = (todos: ITodo[]) => ({
  type: 'SET_TODOS',
  payload: {
    todos,
  },
});
