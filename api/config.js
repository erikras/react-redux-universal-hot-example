module.exports = {
  development: {
    isProduction: false,
    apiPort: process.env.APIPORT,
  },
  production: {
    isProduction: true,
    apiPort: process.env.APIPORT,
  }
}[process.env.NODE_ENV || 'development'];
