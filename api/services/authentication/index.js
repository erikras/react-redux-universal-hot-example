// import authentication from 'feathers-authentication';
import authentication, { TokenService as token, LocalService as local } from 'feathers-authentication';

export default function authenticationService() {
  const app = this;

  const config = app.get('config');

  app.configure(authentication(config.auth))
    .configure(token())
    .configure(local());
}
