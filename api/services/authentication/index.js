import hooks from 'feathers-hooks-common';
import authentication, {
  TokenService as tokenService,
  LocalService as localService,
  OAuth2Service as oauth2Service
} from 'feathers-authentication';

function addTokenExpiration() {
  return hook => {
    if (hook.result.token) {
      hook.result.expires = hook.app.get('auth').cookie.maxAge || null;
    }
    return hook;
  };
}

function restToSocketAuth() {
  return hook => {
    if (hook.params.provider !== 'rest') return hook;
    const { token, user } = hook.result;
    const { socketId } = hook.data;
    if (socketId && hook.app.io && token) {
      const userSocket = Object.values(hook.app.io.sockets.connected).find(socket => socket.client.id === socketId);
      if (userSocket && userSocket.feathers) {
        userSocket.feathers.token = token;
        userSocket.feathers.user = user;
        userSocket.feathers.authenticated = !!token;
      }
    }
    return hook;
  };
}

export socketAuth from './socketAuth';

export default function authenticationService() {
  const app = this;

  const config = app.get('config').auth;

  app.configure(authentication(config))
    .configure(tokenService())
    .configure(localService())
    .configure(oauth2Service(config.facebook));


  app.service('auth/local')
    .after({
      create: [
        hooks.remove('user.password'),
        addTokenExpiration(),
        restToSocketAuth()
      ]
    });

  app.service('auth/facebook')
    .after({
      create: [
        addTokenExpiration(),
        restToSocketAuth()
      ]
    });
}
