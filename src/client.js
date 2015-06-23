import React from 'react';
import Router from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import routes from './views/routes';
import createRedux from './redux/create';
import { Provider } from 'redux/react';
import ApiClient from './ApiClient';
const history = new BrowserHistory;
const client = new ApiClient();

const dest = document.getElementById('content');
const redux = createRedux(client, window.__data);
const element = (<Provider redux={redux}>
  {() => <Router history={history} children={routes}/> }
</Provider>);
React.render(element, dest);

if (process.env.NODE_ENV !== "production") {
  window.React = React; // enable debugger
  const reactRoot = window.document.getElementById("content");

  if (!reactRoot || !reactRoot.firstChild || !reactRoot.firstChild.attributes || !reactRoot.firstChild.attributes["data-react-checksum"]) {
    console.error("Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.");
  }
}