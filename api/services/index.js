import knex from 'knex';
import knexConfig from '../../knexfile';
import _bookshelf from 'bookshelf';
import users from './users';

export default function services() {
  const app = this;
  const bookshelf = _bookshelf(knex(knexConfig[process.env.NODE_ENV || 'development']));

  bookshelf.plugin('registry'); // Resolve circular dependencies with relations
  bookshelf.plugin('visibility');

  app.set('bookshelf', bookshelf);

  app.configure(users);
}
