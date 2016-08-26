/* eslint-disable */
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('user').insert({
          email: 'test@test.fr',
          // password: 'test' | https://www.dailycred.com/article/bcrypt-calculator
          password: '$2a$04$zaxnwxEs3EJt1tOX2.I1u.Sa10BJRtCqWuKM8qqh8TXr3gJO235VC',
        })
      ]);
    });
};
/* eslint-enable */
