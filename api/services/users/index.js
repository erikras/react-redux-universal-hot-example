import { user } from '../../database';
import feathersKnex from 'feathers-knex';
import hooks from './hooks';

export default function userService() {
  const app = this;

  const options = {
    Model: app.get('bookshelf').knex,
    name: 'user',
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/users', feathersKnex(options));

  // Get our initialize service to that we can bind hooks
  const userService = app.service('/users');

  // Set up our before hooks
  userService.before(hooks.before);

  // Set up our after hooks
  userService.after(hooks.after);
}
