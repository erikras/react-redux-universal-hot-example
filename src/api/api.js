import express from 'express';
import config from '../config';
import * as actions from './routes/index';

const app = express();

module.exports = function () {
  return new Promise((resolve, reject) => {
    app.use(function (req, res) {
      var matcher = /\/([^?]+)/.exec(req.url),
        action = matcher && actions[matcher[1]];
      if (action) {
        action(req)
          .then(function (result) {
            res.json(result);
          }, function (reason) {
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
};