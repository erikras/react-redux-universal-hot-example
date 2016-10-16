import hooks from 'feathers-hooks';
import {
  TokenService as tokenService,
  LocalService as localService,
  OAuth2Service as oauth2Service
} from 'feathers-authentication';
import authMiddleware from 'feathers-authentication/lib/middleware';

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

  const config = app.get('auth');

  const { exposeRequestResponse, tokenParser, verifyToken, populateUser, logout } = authMiddleware;

  const middleware = [
    exposeRequestResponse(config),
    tokenParser(config),
    verifyToken(config),
    populateUser(config),
    logout(config)
  ];

  app.use(middleware)
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
