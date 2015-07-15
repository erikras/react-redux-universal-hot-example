/*global __DEVELOPMENT__*/
import Express from 'express';
import React from 'react';
import Location from 'react-router/lib/Location';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from 'http-proxy';
import path from 'path';
import createStore from './redux/create';
import api from './api/api';
import ApiClient from './ApiClient';
import universalRouter from './universalRouter';
const app = new Express();
const proxy = httpProxy.createProxyServer({
  target: 'http://localhost:' + config.apiPort
});

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'favicon.ico')));

let webpackStats;

if (!__DEVELOPMENT__) {
  webpackStats = require('../webpack-stats.json');
}

app.use(require('serve-static')(path.join(__dirname, '..', 'static')));

// Proxy to API server
app.use('/api', (req, res) => {
  proxy.web(req, res);
});

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    webpackStats = require('../webpack-stats.json');
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    delete require.cache[require.resolve('../webpack-stats.json')];
  }
  const client = new ApiClient(req);
  const store = createStore(client);
  const location = new Location(req.path, req.query);
  universalRouter(location, undefined, store)
    .then((component) => {
      try {
        res.send('<!doctype html>\n' + React.renderToString(
            <html lang="en-us">
            <head>
              <meta charSet="utf-8"/>
              <title>React Redux Universal Hot Example</title>
              <link rel="shortcut icon" href="/favicon.ico"/>
              <link href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/css/bootstrap.css"
                    media="screen, projection" rel="stylesheet" type="text/css"/>
              <link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css"
                    media="screen, projection" rel="stylesheet" type="text/css"/>
              {webpackStats.css.map((css, i) => <link href={css} ref={i}
                                                      media="screen, projection" rel="stylesheet" type="text/css"/>)}
            </head>
            <body>
            <div id="content" dangerouslySetInnerHTML={{__html: React.renderToString(component)}}/>
            <script dangerouslySetInnerHTML={{__html: `window.__data=${JSON.stringify(store.getState())};`}}/>
            <script src={webpackStats.script[0]}/>
            </body>
            </html>));
      } catch (error) {
        console.error('ERROR', error);
        res.status(500).send({error: error});
      }
    }, (error) => {
      console.error('ERROR', error);
      res.status(500).send({error: error});
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
