import Express from 'express';
import React from 'react';
import Router from 'react-router';
import Location from 'react-router/lib/Location';
import routes from './views/routes';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from 'http-proxy';
import path from 'path';
import createStore from './redux/create';
import { Provider } from 'react-redux';
import api from './api/api';
import ApiClient from './ApiClient';
const app = new Express();
const proxy = httpProxy.createProxyServer({
  target: 'http://localhost:' + config.apiPort
});

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'favicon.ico')));

let webpackStats;

if (process.env.NODE_ENV === 'production') {
  webpackStats = require('../webpack-stats.json');
}

app.use(require('serve-static')(path.join(__dirname, '..', 'static')));

// Proxy to API server
app.use('/api', (req, res) => {
  proxy.web(req, res);
});

app.use((req, res) => {
  const client = new ApiClient(req);
  const store = createStore(client);
  const location = new Location(req.path, req.query);
  if (process.env.NODE_ENV === 'development') {
    webpackStats = require('../webpack-stats.json');
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    delete require.cache[require.resolve('../webpack-stats.json')];
  }
  Router.run(routes, location, (error, initialState) => {
    if (error) {
      res.status(500).send(error);
    } else {
      Promise.all(initialState.components
        .filter(component => {
          return component.fetchData || (component.DecoratedComponent && component.DecoratedComponent.fetchData);
        })
        .map(component => {
          return (component.fetchData && component.fetchData(store.dispatch)) || (component.DecoratedComponent.fetchData && component.DecoratedComponent.fetchData(store.dispatch));
        }))
        .then(() => {
          const state = store.getState();
          res.send('<!doctype html>\n' + React.renderToString(
              <html lang="en-us">
              <head>
                <meta charSet="utf-8"/>
                <title>React Redux Isomorphic Example</title>
                <link rel="shortcut icon" href="/favicon.ico"/>
                <link href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/css/bootstrap.css"
                      media="screen, projection" rel="stylesheet" type="text/css"/>
                <link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css"
                      media="screen, projection" rel="stylesheet" type="text/css"/>
                {webpackStats.css.map((css, i) => <link href={css} ref={i}
                      media="screen, projection" rel="stylesheet" type="text/css"/>)}
              </head>
              <body>
              <div id="content" dangerouslySetInnerHTML={{__html: React.renderToString(
                <Provider store={store}>
                  {() => <Router location={location} {...initialState}/>}
                </Provider>)
              }}/>
              <script dangerouslySetInnerHTML={{__html: `window.__data=${JSON.stringify(state)};`}}/>
              <script src={webpackStats.script[0]}/>
              </body>
              </html>));
        }).catch((err) => {
          res.status(500).send(err.stack);
        });
    }
  });
});

if (config.port) {
  app.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    } else {
      api().then(() => {
        console.info('==> ✅  Server is listening');
        console.info('==> 🌎  %s running on port %s, API on port %s', config.app.name, config.port, config.apiPort);
      });
    }
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
