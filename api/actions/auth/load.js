import config from 'config';
import { verifyJWT } from 'feathers-authentication/lib/utils';

export default function load(req) {
  const accessToken = req.cookies['feathers-jwt'] || null;

  const defaultValues = {
    accessToken,
    user: null
  };

  if (accessToken) {
    return verifyJWT(accessToken, config.auth)
      .then(payload => req.app.service('users').get(payload.userId))
      .then(user => ({
        accessToken,
        user
      }))
      .catch(() => defaultValues);
  }

  return Promise.resolve(defaultValues);
}
