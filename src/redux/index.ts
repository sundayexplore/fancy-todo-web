import { combineReducers, createStore } from 'redux';

import { userReducer, todoReducer } from './reducers';

const reducers = combineReducers({
  user: userReducer,
  todo: todoReducer,
});

const store = createStore(reducers);

export default store;
