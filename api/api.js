import feathers from 'feathers';
import morgan from 'morgan';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../src/config';
import hooks from 'feathers-hooks';
import rest from 'feathers-rest';
import socketio from 'feathers-socketio';
import middleware from './middleware';
import services from './services';
import * as actions from './actions';
import { mapUrl } from './utils/url.js';
import PrettyError from 'pretty-error';
import http from 'http';
import SocketIo from 'socket.io';

const pretty = new PrettyError();
const app = feathers();

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

app.use((req, res, next) => {
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);

  const { action, params } = mapUrl(actions, splittedUrlPath);

  if (action) {
    action(req, params)
    .then((result) => {
      if (result instanceof Function) {
        result(res);
      } else {
        res.json(result);
      }
    }, (reason) => {
      if (reason && reason.redirect) {
        res.redirect(reason.redirect);
      } else {
        console.error('API ERROR:', pretty.render(reason));
        res.status(reason.status || 500).json(reason);
      }
    });
  } else {
    next(); // res.status(404).end('NOT FOUND');
  }
});

app.configure(hooks())
.configure(rest())
.configure(socketio())
.configure(services)
.configure(middleware);

const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

if (config.apiPort) {
  const runnable = app.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
    console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
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
