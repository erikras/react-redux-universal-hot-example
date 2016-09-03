import hooks from 'feathers-hooks';
import authentication, {
  TokenService as tokenService,
  LocalService as localService,
  OAuth2Service as oauth2Service
} from 'feathers-authentication';

function addTokenExpiration() {
  return hook => {
    if (hook.result.token) {
      hook.result.expires = hook.app.get('auth').cookies['feathers-session'].maxAge || null;
    }
    return hook;
  };
}

function restToSocketAuth(getAuth) {
  return hook => {
    if (hook.params.provider !== 'rest') return hook;
    const { token, user } = getAuth(hook);
    const { socketId } = hook.data;
    if (socketId && hook.app.io && token) {
      const userSocket = Object.values(hook.app.io.sockets.connected).find(socket => socket.client.id === socketId);
      userSocket.feathers.token = token;
      if (user) userSocket.feathers.user = user;
    }
    return hook;
  };
}

export default function authenticationService() {
  const app = this;

  const config = app.get('config');

  app.configure(authentication(config.auth))
    .configure(tokenService())
    .configure(localService())
    .configure(oauth2Service(config.auth.facebook));


  app.use('/auth/sync', {
    create: () => Promise.resolve({ synced: true })
  });

  app.service('auth/sync')
    .before({
      create: restToSocketAuth(hook => hook.params)
    });


  app.service('auth/local')
    .after({
      create: [
        hooks.remove('user.password'),
        addTokenExpiration(),
        restToSocketAuth(hook => hook.result)
      ]
    });

  app.service('auth/facebook')
    .after({
      create: [
        // TODO: cf src/containers/Login/Login.js l25 (and stop use facebook email)
        /* hook => { // Share the facebook email if the user email does not exist
          const { email, facebook } = hook.result.user;
          if (facebook && facebook.email && !email) {
            hook.result.user.email = facebook.email;
            return hook;
          }
        }, */
        addTokenExpiration(),
        restToSocketAuth(hook => hook.result)
      ]
    });
}
