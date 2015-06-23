import Express from 'express';
import React from 'react';
import Router from 'react-router';
import Location from 'react-router/lib/Location';
import routes from './views/routes';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from 'http-proxy';
import url from 'url';
import path from 'path';
import createRedux from './redux/create';
import { Provider } from 'redux/react';
import api from './api/api';
import ApiClient from './ApiClient';
const app = new Express();
const proxy = httpProxy.createProxyServer({
  target: 'http://localhost:' + config.apiPort
});

app.use(compression());
app.use(require('serve-static')(path.join(__dirname, '..', 'static')));
app.use(favicon(path.join(__dirname, '..', 'favicon.ico')));

// Proxy to API server
app.use('/api', (req, res) => {
  proxy.web(req, res);
});

app.use((req, res, next) => {
  const client = new ApiClient(req);
  const redux = createRedux(client);
  const location = new Location(req.path, req.query);
  Router.run(routes, location, (error, initialState, transition) => {
    if (error) {
      res.status(500).send(error);
    } else {
      Promise.all(initialState.components
        .filter(component => component.fetchData)
        .map(component => {
          return component.fetchData(redux.dispatch);
        }))
        .then(() => {
          const webserver = process.env.NODE_ENV === "production" ? "" : "//localhost:8080";
          const state = redux.getState();
          res.send('<!doctype html>\n' + React.renderToString(
              <html lang="en-us">
              <head>
                <meta charSet="utf-8"/>
                <title>React Redux Isomorphic Example</title>
                <link rel="shortcut icon" href="/favicon.ico"/>
                <link href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/css/bootstrap.css"
                      media="screen, projection" rel="stylesheet" type="text/css"/>
              </head>
              <body>
              <div id="content" dangerouslySetInnerHTML={{__html: React.renderToString(
                <Provider redux={redux}>
                  {() => <Router location={location} {...initialState}/>}
                </Provider>)
              }}/>
              <script dangerouslySetInnerHTML={{__html: `window.__data=${JSON.stringify(state)};`}}/>
              <script src={`${webserver}/dist/client.js`}/>
              </body>
              </html>));
        }).catch((error) => {
          res.status(500).send(error.stack);
        });
    }
  })
});


if (config.port) {
  app.listen(config.port, function (err) {
    if (err) {
      console.error(err);
    } else {
      api().then(function () {
        console.info('==> ✅  Server is listening');
        console.info('==> 🌎  %s running on port %s, API on port %s', config.app.name, config.port, config.apiPort);
      });
    }
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
