import authentication from 'feathers-authentication';

export default function authenticationService() {
  const app = this;

  let config = app.get('auth');
  
  app.configure(authentication(config));
};
