/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import OneApiClient from './helpers/OneApiClient';
import io from 'socket.io-client';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';
import useScroll from 'scroll-behavior/lib/useStandardScroll';

import getRoutes from './routes';

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n-client';

// import '../node_modules/katex/dist/katex.min.css';
// import 'katex/dist/katex.min.css';
// import '../node_modules/katex/dist/katex.min.css';
// import { BlockMath, InlineMath } from 'react-katex';

const client = new ApiClient();
const oneApiClient = new OneApiClient();

const providers = {client, oneApiClient};

const _browserHistory = useScroll(() => browserHistory)();
const dest = document.getElementById('content');
const store = createStore(_browserHistory, providers /*helpers = providers*/, window.__data);
const history = syncHistoryWithStore(_browserHistory, store);

function initSocket() {
  const socket = io('', {path: '/ws'});
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

i18n.changeLanguage(window.__i18n.locale);
i18n.addResourceBundle(window.__i18n.locale, 'common', window.__i18n.resources, true);

const component = (
  <Router render={(props) =>
        // <ReduxAsyncConnect {...props} helpers={{client, oneApiClient}} filter={item => !item.deferred} />
        <ReduxAsyncConnect {...props} helpers={{providers}} filter={item => !item.deferred} />
      } history={history}>
    {getRoutes(store)}
  </Router>
);

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store} key="provider">
      {component}
    </Provider>
  </I18nextProvider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes
    // || !dest.firstChild.attributes['data-react-checksum']
  ) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./containers/DevTools/DevTools');
  ReactDOM.render(
    <I18nextProvider i18n={i18n}>
      <Provider store={store} key="provider">
        <div>
          {component}
          <DevTools />
        </div>
      </Provider>
    </I18nextProvider>,
    dest
  );
}
