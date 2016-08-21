import authentication, { TokenService as token, LocalService as local } from 'feathers-authentication';

export default function authenticationService() {
  const app = this;

  const config = app.get('config');

  app.configure(authentication(config.auth))
    .configure(token())
    .configure(local());

  const service = app.service('auth/local');

  service.after(hook => {
    const { user } = hook.result;
    if (user.password) {
      delete user.password;
    }
    if (user) {
      hook.result.expires = app.get('auth').cookies['feathers-session'].maxAge || null;
    }
    return hook;
  });
}
