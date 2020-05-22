import { combineReducers, createStore } from 'redux';

import { demoReducer } from '@/reducers';

const reducers = combineReducers({
  demo: demoReducer
});
const store = createStore(reducers);

export default store;
