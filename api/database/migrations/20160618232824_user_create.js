/* eslint-disable */
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('user', function (table) {
      table.increments('id').primary();
      table.string('email').unique();
      table.string('password');
      table.timestamps();
    })
  ]);
};


exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('user')
  ]);
};
/* eslint-enable */
