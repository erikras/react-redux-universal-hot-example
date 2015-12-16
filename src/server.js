import Koa from 'koa';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from './config';
import favicon from 'koa-favicon';
import serveStatic from 'koa-static';
import compression from 'koa-compress';
import convert from 'koa-convert'
// import httpProxy from 'http-proxy';
import proxy from 'koa-proxy'


import path from 'path';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import Html from './helpers/Html';
import PrettyError from 'pretty-error';
import http from 'http';
import SocketIo from 'socket.io';

import {ReduxRouter} from 'redux-router';
import createHistory from 'history/lib/createMemoryHistory';
import {reduxReactRouter, match} from 'redux-router/server';
import {Provider} from 'react-redux';
import qs from 'query-string';
import getRoutes from './routes';
import getStatusFromRoutes from './helpers/getStatusFromRoutes';

const pretty = new PrettyError();
const app = new Koa();

app.use(convert(compression()));
app.use(convert(favicon(path.join(__dirname, '..', 'static', 'favicon.ico'))));

// TODO: Fix static middleware for koa 2.0
// app.use(convert(serveStatic(path.join(__dirname, '..', 'static'))));

// TODO: Proxy API Server - we need a router for app.use(path, middleware)
// const p = proxy({ host: 'http://' + config.apiHost + ':' + config.apiPort })
// app.use('/api', p)

app.use(function(ctx, next)  {

  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  const client = new ApiClient(ctx);

  const store = createStore(reduxReactRouter, getRoutes, createHistory, client);

  function hydrateOnClient() {
    ctx.body = '<!doctype html>\n' +
      ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>);
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
  }

  return new Promise((resolve, reject) => { 
    store.dispatch(match(ctx.originalUrl, (error, redirectLocation, routerState) => {
      if (redirectLocation) {
        ctx.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        console.error('ROUTER ERROR:', pretty.render(error));
        ctx.status = 500;
        hydrateOnClient();
      } else if (!routerState) {
        ctx.status = 500;
        hydrateOnClient();
      } else {
        // Workaround redux-router query string issue:
        // https://github.com/rackt/redux-router/issues/106
        if (routerState.location.search && !routerState.location.query) {
          routerState.location.query = qs.parse(routerState.location.search);
        }

        store.getState().router.then(() => {
          const component = (
            <Provider store={store} key="provider">
              <ReduxRouter/>
            </Provider>
          );

          const status = getStatusFromRoutes(routerState.routes);
          if (status) {
            ctx.status = status;
          }
          ctx.body = '<!doctype html>\n' +
            ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>);
        }).catch((err) => {
          console.error('DATA FETCHING ERROR:', pretty.render(err));
          ctx.status = 500;
          hydrateOnClient();
        }).then(resolve)
      }
    }))
  })

});

if (config.port) {
  if (config.isProduction) {
    const io = new SocketIo(server);
    io.path('/api/ws');
  }

  app.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
