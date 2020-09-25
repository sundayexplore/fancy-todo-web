import { combineReducers, createStore } from 'redux';

import {
  userReducer,
  todoReducer,
  currentReducer,
  snackbarReducer,
} from './reducers';

const reducers = combineReducers({
  user: userReducer,
  todo: todoReducer,
  current: currentReducer,
  snackbar: snackbarReducer,
});

const store = createStore(reducers, enableReduxDevTools());

function enableReduxDevTools() {
  if (process.env.NODE_ENV !== 'production' && (process as any).browser) {
    return (
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    );
  }
}

export default store;
