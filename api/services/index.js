import users from './users';
import messages from './messages';

export default function services() {
  const app = this;

  app.configure(users);
  app.configure(messages);
}
