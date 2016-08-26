// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: 'myapp_dev',
      user:     'root',
      password: 'grut'
    },
    migrations: {
      tableName: 'migrations',
      directory: './api/database/migrations'
    },
    seeds: {
      directory: './api/database/seeds'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'myapp',
      user:     'root',
      password: 'grut'
    },
    migrations: {
      tableName: 'migrations',
      directory: './api/database/migrations'
    }
  }

};
