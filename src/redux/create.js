import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import createMiddleware from './middleware/clientMiddleware';
import { routerMiddleware } from 'react-router-redux';
import { autoRehydrate, createPersistor } from 'redux-persist';

export default function createStore(history, client, data, online = true, persistConfig = null) {
  const reduxRouterMiddleware = routerMiddleware(history);
  const middleware = [createMiddleware(client), reduxRouterMiddleware];

  let finalCreateStore;
  if (__CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools');
    const DevTools = require('../containers/DevTools/DevTools');
    const enhancers = (!online ? [autoRehydrate({ log: true })] : []).concat([
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    ]);
    finalCreateStore = compose(...enhancers)(_createStore);
  } else {
    const enhancers = (__CLIENT__ && !online ? [autoRehydrate()] : []).concat(applyMiddleware(...middleware));
    finalCreateStore = compose(...enhancers)(_createStore);
  }

  const reducer = require('./reducer');

  const store = finalCreateStore(reducer, data);
  if (persistConfig) createPersistor(store, persistConfig);
  store.dispatch({ type: 'PERSIST' });

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(require('./reducer'));
    });
  }

  return store;
}
