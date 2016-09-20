import feathersNedb from 'feathers-nedb';
import NeDB from 'nedb';
import hooks from './hooks';

export default function userService() {
  const app = this;

  const options = {
    Model: new NeDB({
      filename: `${__dirname}/users.nedb`,
      autoload: true
    }),
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/users', feathersNedb(options));

  app.service('users')
    .before(hooks.before)
    .after(hooks.after);
}
