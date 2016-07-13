import config from '../config';
import knex from 'knex';
import knexConfig from '../../knexfile';
import Bookshelf from 'bookshelf';
import authentication from './authentication';
import users from './users';

export default function services() {
  const app = this;
  const bookshelf = Bookshelf(knex(knexConfig[process.env.NODE_ENV || 'development']));

  bookshelf.plugin('registry'); // Resolve circular dependencies with relations
  bookshelf.plugin('visibility');

  app.set('bookshelf', bookshelf);
  app.set('auth', config.auth);

  app.configure(authentication);
  app.configure(users);
}
