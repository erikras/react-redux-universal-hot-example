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
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      database: 'myapp_test',
      user:     'root',
      password: 'grut'
    },
    migrations: {
      tableName: 'migrations',
      directory: './api/database/migrations'
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
