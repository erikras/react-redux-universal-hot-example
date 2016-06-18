import config from '../../config';
import { User } from '../../database';
import { createValidatorPromise as createValidator, required, email } from '../../utils/validation';
import jwt from 'jsonwebtoken';

export default function login(req) {
  return new Promise((resolve, reject) => {
    createValidator({
      email: [required, email],
      password: [required]
    })({
      email: req.body.email,
      password: req.body.password
    })
    .catch(err => reject(err));

    User.where({ email: req.body.email }).fetch()
    .then(
      user => {
        if (!user) return reject({ _error: 'Authentication failed. User not found.' });
        return user.comparePassword(req.body.password)
        .then(
          isMatch => {
            if (!isMatch) reject({ _error: 'Authentication failed. Passwords did not match.' });
            const token = jwt.sign(user, config.secret, {
              expiresIn: 60000
            });
            const userLogged = Object.assign(user.toJSON(), { token });
            req.session.user = userLogged;
            resolve(userLogged);
          },
          errMatch => reject(errMatch));
      },
      err => reject(err));
  });
}
