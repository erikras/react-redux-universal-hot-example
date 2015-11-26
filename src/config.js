const path = require('path');
const sourceRoot = path.resolve(__dirname);
const projectRoot = path.resolve(__dirname, '..');
const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

console.log('overrides path', sourceRoot);
console.log('context', projectRoot);

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'React Redux Example',
    description: 'All the modern best practices in one example.',
    meta: {
      charSet: 'utf-8',
      property: {
        'og:site_name': 'React Redux Example',
        'og:image': 'https://react-redux.herokuapp.com/logo.jpg',
        'og:locale': 'en_US',
        'og:title': 'React Redux Example',
        'og:description': 'All the modern best practices in one example.',
        'twitter:card': 'summary',
        'twitter:site': '@erikras',
        'twitter:creator': '@erikras',
        'twitter:title': 'React Redux Example',
        'twitter:description': 'All the modern best practices in one example.',
        'twitter:image': 'https://react-redux.herokuapp.com/logo.jpg',
        'twitter:image:width': '200',
        'twitter:image:height': '200'
      }
    }
  },
  webpack: {
    context: projectRoot,
    entry: {
      main: [
        'bootstrap-sass!' + sourceRoot + '/theme/bootstrap.config.js',
        'font-awesome-webpack!' + sourceRoot + '/theme/font-awesome.config.js'
      ]
    },
    output: {
      path: projectRoot + '/static/dist'
    },
    resolve: {
      root: sourceRoot,
      alias: {
        routes: sourceRoot + '/routes.js',
        config: sourceRoot + '/config.js',
        reducers: sourceRoot + '/redux/modules/reducer.js'
      }
    }
  }
}, environment);
