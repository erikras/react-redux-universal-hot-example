import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createMiddleware from './clientMiddleware';

export default function createApiClientStore(client, data) {
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

  const reducer = combineReducers(require('../ducks/index'));
  const store = finalCreateStore(reducer, data);
  store.client = client;

  if (module.hot) {
    module.hot.accept('../ducks/index', () => {
      const nextReducer = combineReducers(require('../ducks/index'));
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
