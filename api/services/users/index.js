import feathersKnex from 'feathers-knex';
import hooks from './hooks';

export default function userService() {
  const app = this;

  const options = {
    Model: app.get('database').knex,
    name: 'user',
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/users', feathersKnex(options));

  // Get our initialize service to that we can bind hooks
  const service = app.service('users');

  // Set up our before hooks
  service.before(hooks.before);

  // Set up our after hooks
  service.after(hooks.after);
}
