import knex from 'knex';
import knexConfig from '../../knexfile';
import _bookshelf from 'bookshelf';
import users from './users';
import messages from './messages';

export default function services() {
  const app = this;
  const bookshelf = _bookshelf(knex(knexConfig[process.env.NODE_ENV || 'development']));

  bookshelf.plugin('registry'); // Resolve circular dependencies with relations
  bookshelf.plugin('visibility');

  app.set('database', bookshelf);

  app.configure(users);
  app.configure(messages);
}
