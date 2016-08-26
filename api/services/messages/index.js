import memory from 'feathers-memory';
import hooks from './hooks';

export default function messagesService() {
  const app = this;

  app.use('/messages', memory({
    paginate: {
      default: 25,
      max: 100
    }
  }));

  // Get our initialize service to that we can bind hooks
  const service = app.service('messages');

  // Set up our before hooks
  service.before(hooks.before);

  // Set up our after hooks
  service.after(hooks.after);
}
