import { createStore, combineReducers, applyMiddleware } from 'redux';
import createMiddleware from './clientMiddleware';
import * as reducers from '../reducers/index';
const reducer = combineReducers(reducers);

export default function(client, data) {
  const middleware = createMiddleware(client);
  const finalCreateStore = applyMiddleware(middleware)(createStore);
  return finalCreateStore(reducer, data);
}

