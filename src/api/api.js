import express from 'express';
import config from '../config';
import * as actions from './routes/index';

const app = express();

export default function api() {
  return new Promise((resolve) => {
    app.use((req, res) => {
      let matcher = /\/([^?]+)/.exec(req.url);
      let action = matcher && actions[matcher[1]];
      if (action) {
        action(req)
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
