import { IDemoReducer, IAction, ITodo } from '@/types';

const initialState: IDemoReducer = {
  todos: []
};

export default function demoReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case 'DEMO_ADD_TODO':
      return { ...state, todos: state.todos.concat(action.payload.todo) };
  
    case 'DEMO_UPDATE_TODO':
      const updatedTodo: ITodo = action.payload.todo;
      const updatedTodos: ITodo[] = state.todos.map((todo: ITodo) => {
        if (todo._id == updatedTodo._id) {
          todo = updatedTodo;
        }
        return todo;
      });
      return { ...state, todos: updatedTodos };

    case 'DEMO_DELETE_TODO':
      const deletedTodo: ITodo = action.payload.todo;
      const deletedTodos: ITodo[] = state.todos.filter((todo: ITodo) => {
        return todo._id != deletedTodo._id;
      });
      return { ...state, todos: deletedTodos };

    default:
      return state;
  }
}
