/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/lib/createBrowserHistory';
import createLocation from 'history/lib/createLocation';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import universalRouter from './helpers/universalRouter';
import io from 'socket.io-client';

const history = createHistory();
const client = new ApiClient();

const dest = document.getElementById('content');
const store = createStore(client, window.__data);

function initSocket() {
  const socket = io('', {path: '/api/ws', transports: ['polling']});
  socket.on('news', (data) => {
    console.log(data);
    socket.emit('my other event', { my: 'data from client' });
  });
  socket.on('msg', (data) => {
    console.log(data);
  });

  return socket;
}

window.socket = initSocket();

const location = createLocation(document.location.pathname, document.location.search);

const render = (loc, hist, str, preload) => {
  return universalRouter(loc, hist, str, preload)
    .then(({component}) => {
      ReactDOM.render(component, dest);
      if (__DEVTOOLS__) {
        const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
        ReactDOM.render(<div>
          {component}
          <DebugPanel top right bottom key="debugPanel">
            <DevTools store={store} monitor={LogMonitor}/>
          </DebugPanel>
        </div>, dest);
      }
    }, (error) => {
      console.error(error);
    });
};

history.listen(() => {});

history.listenBefore((loc, callback) => {
  render(loc, history, store, true)
    .then((callback));
});

render(location, history, store);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
  const reactRoot = window.document.getElementById('content');

  if (!reactRoot || !reactRoot.firstChild || !reactRoot.firstChild.attributes || !reactRoot.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}
