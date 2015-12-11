import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from 'http-proxy';
import path from 'path';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import Html from './helpers/Html';
import PrettyError from 'pretty-error';
import { Server } from 'http';
import SocketIo from 'socket.io';

import {ReduxRouter} from 'redux-router';
import {match} from 'redux-router/server';
import {Provider} from 'react-redux';
import qs from 'query-string';
import getStatusFromRoutes from './helpers/getStatusFromRoutes';

const DOCTYPE = '<!doctype html>';
const pretty = new PrettyError();
const app = new Express();
const server = new Server(app);
const proxy = httpProxy.createProxyServer({
    target: `http://${config.apiHost}:${config.apiPort}`,
    ws: true
});

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use(Express.static(path.join(__dirname, '..', 'static')));

// Proxy to API server
app.use('/api', (req, res) => proxy.web(req, res));

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
    if (error.code !== 'ECONNRESET') {
        console.error('proxy error', error);
    }

    if (!res.headersSent) {
        res.writeHead(500, {'content-type': 'application/json'});
    }

    const json = {
        error: 'proxy_error',
        reason: error.message
    };

    res.end(JSON.stringify(json));
});

app.use((req, res) => {
    const client = new ApiClient(req);
    const store = createStore(client);
    const assets = webpackIsomorphicTools.assets();
    const storeProvider = (
        <Provider {...{ store }} key="provider">
            <ReduxRouter/>
        </Provider>
    );

    function hydrateOnClient(component) {
        res.send(DOCTYPE + renderToString(<Html {...{ assets, store, component }} />));
    }

    const routingSuccess = ({ routes }) => () => {
        const status = getStatusFromRoutes(routes);
        if (status) {
            res.status(status);
        }

        hydrateOnClient(storeProvider);
    };

    const routingFailure = err => {
        console.error('DATA FETCHING ERROR:', pretty.render(err));
        res.status(500);

        hydrateOnClient();
    };

    if (__DEVELOPMENT__) {
        // Do not cache webpack stats: the script file would change since
        // hot module replacement is enabled in the development env
        webpackIsomorphicTools.refresh();
    }

    if (__DISABLE_SSR__) {
        return hydrateOnClient();
    }

    store.dispatch(match(req.originalUrl, (error, redirectLocation, routerState) => {
        if (redirectLocation) {
            res.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
            console.error('ROUTER ERROR:', pretty.render(error));
            res.status(500);
            hydrateOnClient();
        } else if (!routerState) {
            res.status(500);
            hydrateOnClient();
        } else {
            // Workaround redux-router query string issue:
            // https://github.com/rackt/redux-router/issues/106
            if (routerState.location.search && !routerState.location.query) {
                routerState.location.query = qs.parse(routerState.location.search);
            }

            store.getState().router
                .then(routingSuccess(routerState))
                .catch(routingFailure);
        }
    }));
});

if (config.port) {
    if (config.isProduction) {
        const io = new SocketIo(server);
        io.path('/api/ws');
    }

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
