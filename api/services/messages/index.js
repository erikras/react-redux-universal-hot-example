import feathersNedb from 'feathers-nedb';
import NeDB from 'nedb';
import hooks from './hooks';

export default function messagesService() {
  const app = this;

  const options = {
    Model: new NeDB({
      filename: `${__dirname}/messages.nedb`,
      autoload: true
    }),
    paginate: {
      default: 25,
      max: 100
    }
  };

  app.use('/messages', feathersNedb(options));

  app.service('messages').hooks(hooks);
}
