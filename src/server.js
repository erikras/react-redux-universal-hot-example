import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from 'http-proxy';
import path from 'path';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import OneApiClient from './helpers/OneApiClient';
import Html from './helpers/Html';
import PrettyError from 'pretty-error';
import http from 'http';

import { match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import {Provider} from 'react-redux';
import getRoutes from './routes';

import i18n from './i18n-server';
import i18nMiddleware from 'i18next-express-middleware';
import { I18nextProvider } from 'react-i18next';

const targetUrl = 'http://' + config.apiHost + ':' + config.apiPort;
const oneApiUrl = 'http://' + config.oneApiHost + ':' + config.oneApiPort + "/api";
// const oneApiUrl = 'http://oneapi.hochochoc.local/api';
// const oneApiUrl = 'http://' + process.env.ONE_API_HOST  + "/api";

// const oneApiUrl = 'http://oneapi:3000/api';
const pretty = new PrettyError();
const app = new Express();

var cookieParser = require('cookie-parser');
app.use(cookieParser());
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  // cookieDomainRewrite: "hochochoc.local/api/main",
  cookieDomainRewrite: {
    "*": "",
    "http://hochochoc.local/api/main/": "http://hochochoc.local/api/main/"
  },
  // cookiePathRewrite: false,
  ws: true
});

proxy.on('proxyRes', function (proxyRes, req, res) {
    // var body = new Buffer('');
    // console.log(res);
    // console.log(res.getHeaders());
    // console.log(res.cookies);

    // proxyRes.on('data', function (data) {
    //     body = Buffer.concat([body, data]);
    // });
    // proxyRes.on('end', function () {
    //     body = body.toString();
    //     console.log("res from proxied server:", body);
    //     res.end("my response to cli");
    // });
    // proxyRes.removeHeader('set-cookie');
    if (req.baseUrl !== "/api/main") {
        delete proxyRes.headers['set-cookie'];
    }

    // console.log("baseUrl");
    // console.log(req.baseUrl);
    // console.log(proxyRes);
    // console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
    // console.log('Cookies', JSON.stringify(proxyRes.headers['set-cookie'], true, 2));

});

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));
app.use(i18nMiddleware.handle(i18n))

app.use(Express.static(path.join(__dirname, '..', 'static')));

// Proxy to API server
app.use('/api/main', (req, res) => {
  // console.log("/api/main");
  // console.log(req);
  // console.log(req.session);
  // console.log(req);
  proxy.web(req, res, {target: targetUrl});
});

app.use('/api/one', (req, res) => { //How to keep 'res' from main api???? and modify data????
                                    //Actually, these apis are all about diferrent.....
  // console.log("/api/one");
  // console.log(oneApiUrl);
  // console.log(config);
  // console.log(req);
  // console.log(req.session);
  // console.log(req);
  proxy.web(req, res, {target: oneApiUrl});
  // res.send("Bye");
});

app.use('/ws', (req, res) => {
  proxy.web(req, res, {target: targetUrl + '/ws'});
});

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head);
});

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  let json;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  json = {error: 'proxy_error', reason: error.message};
  res.end(JSON.stringify(json));
});

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  const client = new ApiClient(req);
  const oneApiClient = new OneApiClient(req);

  const providers = {client, oneApiClient};

  const memoryHistory = createHistory(req.originalUrl);
  const store = createStore(memoryHistory, providers);
  const history = syncHistoryWithStore(memoryHistory, store);

  const locale = req.language;
  const resources = i18n.getResourceBundle(locale, 'common');
  const i18nClient = {locale, resources};

  const i18nServer = i18n.cloneInstance();
  i18nServer.changeLanguage(locale);

  function hydrateOnClient() {
    res.send('<!doctype html>\n' +
      ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store} i18n={i18nClient}/>));
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  match({ history, routes: getRoutes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      loadOnServer({...renderProps, store, helpers: {providers}}).then(() => {
        const component = (
          <I18nextProvider i18n={i18nServer}>
            <Provider store={store} key="provider">
              <ReduxAsyncConnect {...renderProps} />
            </Provider>
          </I18nextProvider>
        );

        res.status(200);

        global.navigator = {userAgent: req.headers['user-agent']};

        res.send('<!doctype html>\n' +
          ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store} i18n={i18nClient}/>));
      });
    } else {
      res.status(404).send('Not found');
    }
  });
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
