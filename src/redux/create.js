import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createMiddleware from './clientMiddleware';
import * as reducers from '../reducers/index';
const reducer = combineReducers(reducers);
import { devTools, persistState } from 'redux-devtools';

export default function(client, data) {
  const middleware = createMiddleware(client);
  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__) {
    finalCreateStore = compose(
      applyMiddleware(middleware),
      devTools(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
      createStore
    );
  } else {
    finalCreateStore = applyMiddleware(middleware)(createStore);
  }
  return finalCreateStore(reducer, data);
}

