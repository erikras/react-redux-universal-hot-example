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

  app.service('messages')
    .before(hooks.before)
    .after(hooks.after);
}
