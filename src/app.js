import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import rest from 'feathers-rest/client';
import socketio from 'feathers-socketio/client';
import authentication from 'feathers-authentication/client';
import io from 'socket.io-client';
import superagent from 'superagent';
import config from './config';

const host = __SERVER__ ? `http://${config.apiHost}:${config.apiPort}` : '/socket.io';
const hostRest = __SERVER__ ? `http://${config.apiHost}:${config.apiPort}` : '/api';

export const app = feathers()
.configure(socketio(io('', { path: host })))
.configure(hooks())
.configure(authentication());

export const restApp = feathers()
.configure(rest(hostRest).superagent(superagent))
.configure(hooks())
.configure(authentication());
