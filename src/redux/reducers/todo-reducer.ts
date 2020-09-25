import { ITodoReducer, IAction, ITodo } from '@/types';

const initialState: ITodoReducer = {
  todos: [] as ITodo[],
};

export default function todoReducer(
  state = initialState,
  action: IAction,
): ITodoReducer {
  switch (action.type) {
    case 'SET_TODOS':
      return { ...state, todos: [...action.payload.todos] };

    case 'ADD_TODO':
      return {
        ...state,
        todos: state.todos.concat(action.payload.todo),
      };

    case 'UPDATE_TODO':
      const copiedTodos = [...state.todos];
      const updatedTodoIdx = copiedTodos.findIndex(
        (todo) => todo._id === action.payload.todo._id,
      );
      copiedTodos[updatedTodoIdx] = action.payload.todo;

      return {
        ...state,
        todos: copiedTodos,
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: [...state.todos].filter(
          (todo) => todo._id !== action.payload.todoId,
        ),
      };

    default:
      return state;
  }
}
