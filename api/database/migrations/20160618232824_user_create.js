exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTableIfNotExists('user', table => {
    table.increments('id').primary();
    table.string('email').unique();
    table.string('password');
    table.timestamps();
  })
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTableIfExists('user')
]);
