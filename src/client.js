/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import io from 'socket.io-client';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-connect';
import { AppContainer as HotEnabler } from 'react-hot-loader';
import withScroll from 'scroll-behavior';
import getRoutes from './routes';

const client = new ApiClient();
const _browserHistory = withScroll(browserHistory);
const dest = document.getElementById('content');
const store = createStore(_browserHistory, client, window.__data);
const history = syncHistoryWithStore(_browserHistory, store);

function initSocket() {
  const socket = io('', { path: '/ws' });
  socket.on('news', (data) => {
    console.log(data);
    socket.emit('my other event', { my: 'data from client' });
  });
  socket.on('msg', (data) => {
    console.log(data);
  });

  return socket;
}

global.socket = initSocket();

const renderRouter = (props) => <ReduxAsyncConnect {...props} helpers={{ client }} filter={item => !item.deferred} />;
const render = routes => {
  ReactDOM.render(
    <HotEnabler>
      <Provider store={store} key="provider">
        <Router history={history} render={renderRouter}>
          {routes}
        </Router>
      </Provider>
    </HotEnabler>,
    dest
  );
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

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
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
