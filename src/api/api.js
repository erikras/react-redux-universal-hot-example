import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../config';
import * as actions from './routes/index';
import PrettyError from 'pretty-error';

const pretty = new PrettyError();
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
      
      const matcher = req.url.split('?')[0].split('/').slice(1);

      let action = false;
      let params = null;
      let apiActions = actions;
      let sliceIndex = 0; 

      for (let actionName of matcher) {

        if (apiActions[actionName]) {
          action = apiActions[actionName];
        }

        if (typeof action === 'function') {
          params = matcher.slice(++sliceIndex);
          break;
        }
        apiActions = action;
        ++sliceIndex;
      }

      if (action && typeof action == 'function') {
        action(req, params)
          .then((result) => {
            res.json(result);
          }, (reason) => {
            if (reason && reason.redirect) {
              res.redirect(reason.redirect);
            } else {
              console.error('API ERROR:', pretty.render(reason));
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
