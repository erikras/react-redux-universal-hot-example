#!/usr/bin/env node
import path from 'path';
import http from 'http';
import { express, renderer } from 'universal-redux';
import httpProxy from 'http-proxy';
import config from '../config/universal-redux.config.js';
import SocketIo from 'socket.io';

const isProduction = process.env.NODE_ENV !== 'production';
const apiPort = process.env.APIPORT;
const apiHost = process.env.APIHOST || 'localhost';
const apiEndpoint = '/api';

function setupProxy(app) {

  const proxy = httpProxy.createProxyServer({
    target: 'http://' + apiHost + ':' + apiPort,
    ws: true
  });

  // Proxy to API server
  app.use(`${apiEndpoint}`, (req, res) => {
    proxy.web(req, res);
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
}

const app = express(config);

setupProxy(app);

app.use(renderer(config));

const server = new http.Server(app);

if (!isProduction) {
  const io = new SocketIo(server);
  io.path(`${__API_ENDPOINT__}/ws`);
}

server.listen(config.server.port, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('==> 🌎  API calls will be received at:', config.server.host + ':' + config.server.port + apiEndpoint);
  console.info('==> 💻  Open http://localhost:%s in a browser to view the app.', config.server.port);
});
