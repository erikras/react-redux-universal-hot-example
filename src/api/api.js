import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../config';
import * as actions from './routes/index';

const app = express();
app.use(session({
  secret: 'react and redux rule!!!!',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
app.use(bodyParser.json());

export default function api() {
  return new Promise((resolve) => {
    app.use((req, res) => {
      let matcher = req.url.split('/');
      let action = matcher && actions[matcher[1]];
      if (action) {
        action(req, matcher.slice(2))
          .then((result) => {
            res.json(result);
          }, (reason) => {
            if (reason && reason.redirect) {
              res.redirect(reason.redirect);
            } else {
              console.error('API ERROR:', reason);
              res.status(reason.status || 500).json(reason);
            }
          });
      } else {
        res.status(404).end('NOT FOUND');
      }
    });
    app.listen(config.apiPort);
    resolve();
  });
}
