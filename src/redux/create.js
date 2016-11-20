import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createPersistor } from 'redux-persist';
import createMiddleware from './middleware/clientMiddleware';
import createReducer, { injectAsyncReducer } from './reducer';

export default function createStore(history, client, data, persistConfig = null) {
  const middleware = [createMiddleware(client), routerMiddleware(history)];

  let enhancers = [applyMiddleware(...middleware)];
  if (__CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools');
    const DevTools = require('../containers/DevTools/DevTools');
    enhancers = [
      ...enhancers,
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    ];
  }

  const finalCreateStore = compose(...enhancers)(_createStore);
  const store = finalCreateStore(createReducer(), data);

  store.asyncReducers = {};
  store.injectAsyncReducer = injectAsyncReducer.bind(null, store);

  if (persistConfig) createPersistor(store, persistConfig);
  store.dispatch({ type: 'PERSIST' });

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(require('./reducer').default());
    });
  }

  return store;
}
