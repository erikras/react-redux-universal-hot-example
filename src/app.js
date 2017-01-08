import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import rest from 'feathers-rest/client';
import socketio from 'feathers-socketio/client';
import authentication from 'feathers-authentication-client';
import io from 'socket.io-client';
import superagent from 'superagent';
import localForage from 'localforage';
import config from './config';

const storage = __SERVER__ ? require('localstorage-memory') : localForage;

const host = clientUrl => (__SERVER__ ? `http://${config.apiHost}:${config.apiPort}` : clientUrl);

const configureApp = transport => feathers()
  .configure(transport)
  .configure(hooks())
  .configure(authentication({ storage }));

export const socket = io('', { path: host('/ws'), autoConnect: false });

const app = configureApp(socketio(socket));

export default app;

export const restApp = configureApp(rest(host('/api')).superagent(superagent));

export function exposeInitialRequest(req) {
  restApp.defaultService = null;
  restApp.configure(rest(host('/api')).superagent(superagent, {
    headers: {
      Cookie: req.get('cookie'),
      authorization: req.header('authorization')
    }
  }));

  const accessToken = req.header('authorization') || (req.cookies && req.cookies['feathers-jwt']);
  restApp.set('accessToken', accessToken);
}
