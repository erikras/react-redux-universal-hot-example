import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import rest from 'feathers-rest/client';
import socketio from 'feathers-socketio/client';
import authentication from 'feathers-authentication/client';
import io from 'socket.io-client';
import superagent from 'superagent';
import config from './config';

const storage = __SERVER__ ? require('localstorage-memory') : window.localStorage;

const host = clientUrl => (__SERVER__ ? `http://${config.apiHost}:${config.apiPort}` : clientUrl);

const configureApp = (app, transport) => app
  .configure(transport)
  .configure(hooks())
  .configure(authentication({ storage }));

export const socket = io('', { path: host('/ws'), autoConnect: false });

const app = feathers();

export default app;

export const restApp = feathers();

export const init = () => {
  configureApp(app, socketio(socket));
  configureApp(restApp, rest(host('/api')).superagent(superagent));
};
