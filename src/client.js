/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-connect';
import { AppContainer as HotEnabler } from 'react-hot-loader';
import { useScroll } from 'react-router-scroll';
import { getStoredState } from 'redux-persist';
import localForage from 'localforage';
import { socket } from 'app';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import getRoutes from './routes';
import isOnline from './utils/isOnline';

const offlinePersistConfig = {
  storage: localForage,
  whitelist: ['auth', 'info', 'chat']
};

const client = new ApiClient();
const dest = document.getElementById('content');

function initSocket() {
  socket.on('news', data => {
    console.log(data);
    socket.emit('my other event', { my: 'data from client' });
  });
  socket.on('msg', data => {
    console.log(data);
  });

  return socket;
}

global.socket = initSocket();

Promise.all([window.__data ? true : isOnline(), getStoredState(offlinePersistConfig)])
  .then(([online, storedData]) => {
    if (online) socket.open();

    // if your server doesn't authenticate socket connexion by cookie
    // if (online) app.authenticate().catch(() => null);

    const data = !online ? { ...storedData, ...window.__data, online } : { ...window.__data, online };
    const store = createStore(browserHistory, client, data, offlinePersistConfig);
    const history = syncHistoryWithStore(browserHistory, store);

    const renderRouter = props => <ReduxAsyncConnect
      {...props}
      helpers={{ client }}
      filter={item => !item.deferred}
      render={applyRouterMiddleware(useScroll())}
    />;

    const render = routes => {
      match({ history, routes }, (error, redirectLocation, renderProps) => {
        ReactDOM.render(
          <HotEnabler>
            <Provider store={store} key="provider">
              <Router {...renderProps} render={renderRouter} history={history}>
                {routes}
              </Router>
            </Provider>
          </HotEnabler>,
          dest
        );
      });
    };

    render(getRoutes(store));

    if (module.hot) {
      module.hot.accept('./routes', () => {
        const nextRoutes = require('./routes')(store);
        render(nextRoutes);
      });
    }

    if (process.env.NODE_ENV !== 'production') {
      window.React = React; // enable debugger

      if (!dest || !dest.firstChild || !dest.firstChild.attributes
        || !dest.firstChild.attributes['data-react-checksum']) {
        console.error('Server-side React render was discarded.' +
          'Make sure that your initial render does not contain any client-side code.');
      }
    }

    if (__DEVTOOLS__ && !window.devToolsExtension) {
      const devToolsDest = document.createElement('div');
      window.document.body.insertBefore(devToolsDest, null);
      const DevTools = require('./containers/DevTools/DevTools');
      ReactDOM.render(
        <Provider store={store} key="provider">
          <DevTools />
        </Provider>,
        devToolsDest
      );
    }

    if (online && !__DEVELOPMENT__ && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
        .then(() => {
          console.log('Service worker registered!');
        })
        .catch(error => {
          console.log('Error registering service worker: ', error);
        });

      navigator.serviceWorker.ready.then((/* registration */) => {
        console.log('Service Worker Ready');
      });
    }
  });
