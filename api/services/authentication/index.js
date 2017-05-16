import auth from 'feathers-authentication';
import jwt from 'feathers-authentication-jwt';
import local from 'feathers-authentication-local';
// import oauth1 from 'feathers-authentication-oauth1';
import oauth2 from 'feathers-authentication-oauth2';
import FacebookTokenStrategy from 'passport-facebook-token';
import { discard } from 'feathers-hooks-common';

export socketAuth from './socketAuth';

function populateUser(authConfig) {
  return hook => hook.app.passport.verifyJWT(hook.result.accessToken, authConfig)
    .then(payload => hook.app.service('users').get(payload.userId))
    .then(user => {
      hook.result.user = user;
    });
}

function restToSocketAuth() {
  return hook => {
    if (hook.params.provider !== 'rest') return hook;
    const { accessToken, user } = hook.result;
    const { socketId } = hook.data;
    if (socketId && hook.app.io && accessToken) {
      const userSocket = Object.values(hook.app.io.sockets.connected).find(socket => socket.client.id === socketId);
      if (userSocket) {
        Object.assign(userSocket.feathers, {
          accessToken,
          user,
          authenticated: true
        });
      }
    }
    return hook;
  };
}

export default function authenticationService() {
  const app = this;

  const config = app.get('config').auth;

  app.configure(auth(config))
    .configure(jwt())
    .configure(local())
    // .configure(oauth1()) // TODO twitter example
    .configure(oauth2({
      name: 'facebook', // if the name differs from your config key you need to pass your config options explicitly
      Strategy: FacebookTokenStrategy
    }));


  app.service('authentication')
    .hooks({
      before: {
        // You can chain multiple strategies on create method
        create: auth.hooks.authenticate(['jwt', 'local', 'facebook']),
        remove: auth.hooks.authenticate('jwt')
      },
      after: {
        create: [
          populateUser(config),
          discard('user.password'),
          restToSocketAuth()
        ]
      }
    });
}
