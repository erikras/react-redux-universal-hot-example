import authentication, {
  TokenService as token,
  LocalService as local,
  OAuth2Service as oauth2
} from 'feathers-authentication';

export default function authenticationService() {
  const app = this;

  const config = app.get('config');

  app.configure(authentication(config.auth))
    .configure(token())
    .configure(local())
    .configure(oauth2(config.auth.facebook));

  app.service('auth/local')
    .after({
      create: hook => {
        const { user } = hook.result;
        if (user.password) {
          delete user.password;
        }
        /* if (user) {
          hook.result.expires = app.get('auth').cookies['feathers-session'].maxAge || null;
        } */
        return hook;
      }
    });

  app.service('auth/facebook')
    .after({ // TODO: cf src/containers/Login/Login.js l25 (and remove this)
      create: hook => { // share the facebook email if the user email does not exist
        const { email, facebook } = hook.result.user;
        if (facebook && facebook.email && !email) {
          hook.result.user.email = facebook.email;
          return hook;
        }
      }
    });
}
