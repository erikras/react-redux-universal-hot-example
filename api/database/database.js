import config from '../config';
import knex from 'knex';
import bookshelf from 'bookshelf';

const Bookshelf = bookshelf(knex(config.knex));

Bookshelf.plugin('registry'); // Resolve circular dependencies with relations
Bookshelf.plugin('visibility');

export default Bookshelf;
