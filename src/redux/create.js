/* global __DEVELOPMENT__, __CLIENT__, __DEVTOOLS__ */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createMiddleware from './clientMiddleware';
import * as reducers from '../reducers/index';

let reducer = combineReducers(reducers);
let lastCreatedStore;

if (module.hot) {
  module.hot.accept('../reducers/index', () => {
    reducer = combineReducers(require('../reducers/index'));
    lastCreatedStore.replaceReducer(reducer);
  });
}

export default function(client, data) {
  const middleware = createMiddleware(client);
  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { devTools, persistState } = require('redux-devtools');
    finalCreateStore = compose(
      applyMiddleware(middleware),
      devTools(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
      createStore
    );
  } else {
    finalCreateStore = applyMiddleware(middleware)(createStore);
  }
  const store = finalCreateStore(reducer, data);
  store.client = client;
  lastCreatedStore = store;
  return store;
}

