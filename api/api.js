import feathers from 'feathers';
import http from 'http';
import SocketIo from 'socket.io';
import morgan from 'morgan';
import session from 'express-session';
import bodyParser from 'body-parser';
import globalConfig from '../src/config';
import config from './config';
import hooks from 'feathers-hooks';
import rest from 'feathers-rest';
import socketio from 'feathers-socketio';
import middleware from './middleware';
import services from './services';
import * as actions from './actions';
import { mapUrl } from './utils/url.js';
import isPromise from 'is-promise';
import PrettyError from 'pretty-error';
import authentication from './services/authentication';

const pretty = new PrettyError();
const app = feathers();

app.set('config', config);

const server = new http.Server(app);

const io = new SocketIo(server);
io.path('/ws');

app.use(morgan('dev'));

app.use(session({
  secret: 'react and redux rule!!!!',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const actionsHandler = (req, res, next) => {
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);

  const { action, params } = mapUrl(actions, splittedUrlPath);

  const catchError = error => {
    console.error('API ERROR:', pretty.render(error));
    res.status(error.status || 500).json(error);
  };

  req.app = app;

  if (action) {
    try {
      const handle = action(req, params);
      (isPromise(handle) ? handle : Promise.resolve(handle))
        .then(result => {
          if (result instanceof Function) {
            result(res);
          } else {
            res.json(result);
          }
        })
        .catch(reason => {
          if (reason && reason.redirect) {
            res.redirect(reason.redirect);
          } else {
            catchError(reason);
          }
        });
    } catch (error) {
      catchError(error);
    }
  } else {
    next(); // res.status(404).end('NOT FOUND'); <- disable feathers
  }
};

// app.use(actionsHandler); <- disable feathers (delete following configuration)

app.configure(hooks())
  .configure(rest())
  .configure(socketio())
  .configure(authentication)
  .use(actionsHandler)
  .configure(services)
  .configure(middleware);

const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

if (globalConfig.apiPort) {
  const runnable = app.listen(globalConfig.apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', globalConfig.apiPort);
    console.info('==> 💻  Send requests to http://%s:%s', globalConfig.apiHost, globalConfig.apiPort);
  });

  io.on('connection', (socket) => {
    socket.emit('news', { msg: '\'Hello World!\' from server' });

    socket.on('history', () => {
      for (let index = 0; index < bufferSize; index++) {
        const msgNo = (messageIndex + index) % bufferSize;
        const msg = messageBuffer[msgNo];
        if (msg) {
          socket.emit('msg', msg);
        }
      }
    });

    socket.on('msg', (data) => {
      const message = { ...data, id: messageIndex };
      messageBuffer[messageIndex % bufferSize] = message;
      messageIndex++;
      io.emit('msg', message);
    });
  });
  io.listen(runnable);
} else {
  console.error('==>     ERROR: No APIPORT environment variable has been specified');
}
