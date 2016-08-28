import feathersNedb from 'feathers-nedb';
import NeDB from 'nedb';
import hooks from './hooks';

export default function messagesService() {
  const app = this;

  app.use('/messages', feathersNedb({
    Model: new NeDB({
      filename: `${__dirname}/messages.nedb`,
      autoload: true
    }),
    paginate: {
      default: 25,
      max: 100
    }
  }));

  app.service('messages')
    .before(hooks.before)
    .after(hooks.after);
}
