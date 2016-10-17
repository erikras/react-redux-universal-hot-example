import feathers from 'feathers';
import morgan from 'morgan';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import publicConfig from '../src/config';
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
import authentication, { middleware as authMiddleware } from 'feathers-authentication';
import authService, { socketAuth } from './services/authentication';

const pretty = new PrettyError();
const app = feathers();

app.set('config', config)
  .use(morgan('dev'))
  .use(cookieParser())
  .use(session({
    secret: 'react and redux rule!!!!',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  }))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json());

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
    next();
  }
};

const socketHandler = io => {
  const bufferSize = 100;
  const messageBuffer = new Array(bufferSize);
  let messageIndex = 0;

  io.use(socketAuth(app));
  io.on('connection', authMiddleware.setupSocketIOAuthentication(app, app.get('auth')));

  io.on('connection', socket => {
    const user = socket.feathers.user ? { ...socket.feathers.user, password: undefined } : undefined;
    socket.emit('news', { msg: '\'Hello World!\' from server', user });

    socket.on('history', () => {
      for (let index = 0; index < bufferSize; index++) {
        const msgNo = (messageIndex + index) % bufferSize;
        const msg = messageBuffer[msgNo];
        if (msg) {
          socket.emit('msg', msg);
        }
      }
    });

    socket.on('msg', data => {
      const message = { ...data, id: messageIndex };
      messageBuffer[messageIndex % bufferSize] = message;
      messageIndex++;
      io.emit('msg', message);
    });
  });
};

app.configure(hooks())
  .configure(authentication(config.auth))
  .configure(rest())
  .configure(socketio({ path: '/ws' }, socketHandler))
  .configure(authService)
  .use(actionsHandler)
  .configure(services)
  .configure(middleware);

if (publicConfig.apiPort) {
  app.listen(publicConfig.apiPort, err => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', publicConfig.apiPort);
    console.info('==> 💻  Send requests to http://%s:%s', publicConfig.apiHost, publicConfig.apiPort);
  });
} else {
  console.error('==>     ERROR: No APIPORT environment variable has been specified');
}
