import React from 'react';
import Router from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import routes from './views/routes';
import createStore from './redux/create';
import { Provider } from 'react-redux';
import ApiClient from './ApiClient';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
const history = new BrowserHistory();
const client = new ApiClient();

const dest = document.getElementById('content');
const store = createStore(client, window.__data);
const elements = [
  <Provider store={store} key="provider">
    {() => <Router history={history} children={routes}/> }
  </Provider>
];
if(__DEVTOOLS__) {
  elements.push(
    <DebugPanel top right bottom key="debugPanel">
      <DevTools store={store} monitor={LogMonitor}/>
    </DebugPanel>
  );
}
React.render(<div>{elements}</div>, dest);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
  const reactRoot = window.document.getElementById('content');

  if (!reactRoot || !reactRoot.firstChild || !reactRoot.firstChild.attributes || !reactRoot.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}
