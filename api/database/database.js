import config from '../../knexfile';
import knex from 'knex';
import bookshelf from 'bookshelf';

const Bookshelf = bookshelf(knex(config[process.env.NODE_ENV || 'development']));

Bookshelf.plugin('registry'); // Resolve circular dependencies with relations
Bookshelf.plugin('visibility');

export default Bookshelf;
