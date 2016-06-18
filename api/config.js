module.exports = {
  secret: 's*cr*tK*y',
  knex: {
    client: 'mysql', // you shlould install Postgres, MSSQL, MySQL, MariaDB, SQLite3, or Oracle (eg: npm i mysql)
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'grut',
      database: 'myapp_test',
      charset: 'utf8'
    }
  }
};
