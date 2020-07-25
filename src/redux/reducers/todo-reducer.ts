import { ITodoReducer, IAction, ITodo } from '@/types';

const initialState: ITodoReducer = {
  todos: [] as ITodo[]
};

export default function todoReducer(state = initialState, action: IAction): ITodoReducer {
  switch (action.type) {
    case 'SET_TODOS':
      return { ...state, ...action.payload.todos };
  
    default:
      return state;
  }
}
