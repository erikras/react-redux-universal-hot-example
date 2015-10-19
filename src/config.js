module.exports = {
  development: {
    isProduction: false,
    port: process.env.PORT,
    apiPort: process.env.APIPORT,
    app: {
      name: 'React Redux Example Development'
    },
    locale: 'en',
    locales: ['en', 'fr']
  },
  production: {
    isProduction: true,
    port: process.env.PORT,
    apiPort: process.env.APIPORT,
    app: {
      name: 'React Redux Example Production'
    },
    locale: 'en',
    locales: ['en', 'fr']
  }
}[process.env.NODE_ENV || 'development'];
