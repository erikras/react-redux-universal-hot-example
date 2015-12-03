/* eslint-disable */
const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';
const projectRoot = path.resolve(__dirname, '..');
const sourceRoot = path.resolve(__dirname, '../src');

module.exports = Object.assign({

  /*
  // The host to run the Express universal renderer. See src/server.js.
  //
  // Expects: String
  */
  host: process.env.HOST || 'localhost',

  /*
  // The port to run Express universal renderer will run on. See src/server.js.
  //
  // Expects: Number
  */
  port: process.env.PORT,

  /*
  // The prefix that Express will look for on incoming requests to determine if calls should be routed to the API.
  //
  // Expects: String
  */ 
  apiPrefix: 'api',

  /*
  // The host at which the Express API will be run. If left undefined, the API
  // server will not be started. See src/api/api.js.
  //
  // Expects: String
  */ 
  apiHost: process.env.APIHOST || 'localhost',

  /*
  // The port at which the Express API will be run. If left undefined, the API
  // server will not be started. See src/api/api.js.
  //
  // Expects: Number
  */ 
  apiPort: process.env.APIPORT,

  /*
  // Configuration for Socket.IO
  */
  socket: {

    /*
    // Whether or not to run Socket.IO
    //
    // Expects: Boolean
    */
    enabled: true
  },

  /*
  // Globals available to both serverside and clientside rendering.
  // You may also add your own here.
  */
  globals: {

    /*
    // Whether or not to run redux-logger
    //
    // Expects: Boolean
    */
    __LOGGER__: false,

    /*
    // Whether or not to run redux-devtools
    //
    // Expects: Boolean
    */
    __DEVTOOLS__: !isProduction,
  },

  /*
  // Enable eslint checks per Webpack build
  //
  // Expects: Boolean
  */  
  lint: true,

  /*
  // Enable native desktop notifications for Webpack build events
  //
  // Expects: Boolean
  */  
  notifications: false,

  /*
  // Path to a file with customizations for the default
  // webpack-isomorphic-tools configuration. Optional.
  //
  // Expects: String
  */  
  toolsConfigPath: __dirname + '/webpack-isomorphic-tools.config.js',

  /*
  // When eneabled, will output Webpack and Webpack Isomorphic
  // Tools configurations at startup
  //
  // Expects: Boolean
  */  
  verbose: true,

  /*
  // Webpack configuration cusomtizations. These properties will
  // be merged with the corresponding default configurations for
  // the Node environment, using webpack-config-merger. Properties
  // with the same name will be overwritten. Arrays will be
  // concatenated. Objects will be merged. There are more parameters
  // available than specified here. For the full list, see 
  // https://webpack.github.io/docs/configuration.html.
  */  
  webpack: {

    /*
    // The Webpack devtool configuration. May affect build times.
    // See https://webpack.github.io/docs/configuration.html#devtool
    */
    devtool: 'inline-eval-cheap-source-map',

    /*
    // Not recommended to change.
    */
    context: projectRoot,

    entry: {
      main: [
        'bootstrap-sass!' + sourceRoot + '/theme/bootstrap.config' + (isProduction ? '.prod' : '') + '.js',
        'font-awesome-webpack!' + sourceRoot + '/theme/font-awesome.config' + (isProduction ? '.prod' : '') + '.js'
      ]
    },

    /*
    // Not recommended to change.
    */
    output: {

      /*
      // Not recommended to change.
      */
      path: projectRoot + '/static/dist'

    },

    resolve: {

      /*
      // Not recommended to change.
      */
      root: sourceRoot,

      alias: {

        /*
        // The react-router Routes file, Required.
        */
        routes: sourceRoot + '/routes.js',

        /*
        // The path to the index of your Redux reducers. Required.
        */
        reducers: sourceRoot + '/redux/modules/reducer.js',

        /*
        // The path to your replacement for the default HTML shell. Optional.
        // If not provided, the default used will be that in src/helpers/Html.js.
        */
        // html: sourceRoot + '/helpers/Html.js',

        /*
        // The path to the index of your API actions. Optional.
        */
        actions: sourceRoot + '/api/actions/index.js'
      }
    }
  },

  /*
  // Metadata for the site
  */
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
  }
});
/* eslint-enable */
