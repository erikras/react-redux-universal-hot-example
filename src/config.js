module.exports = {
  development: {
    isProduction: false,
    port: 3000,
    apiPort: 3030,
    static: 'http://localhost:3031',
    app: {
      name: 'React Redux Example Development'
    }
  },
  production: {
    isProduction: true,
    port: process.env.PORT,
    apiPort: 3030,
    static: '',
    app: {
      name: 'React Redux Example Production'
    }
  }
}[process.env.NODE_ENV || 'development'];
