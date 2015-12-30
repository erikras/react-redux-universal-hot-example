/* eslint-disable */
const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';
const projectRoot = path.resolve(__dirname, '..');
const sourceRoot = path.resolve(__dirname, '../src');
const apiPort = process.env.APIPORT;
const apiHost = process.env.APIHOST || 'localhost';
const meta = require('./meta.config.js');

module.exports = {

  /*
  // Express configuration
  */
  server: {
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
    // The path at which static assets are served from. If omitted, Express will
    // not serve any static assets. Optional.
    //
    // Expects: String
    */
    staticPath: projectRoot + '/static',

    /*
    // The path at which a favicon image will be served from using the `serve-favicon`
    // library. If omitted, Express will not serve a favicon. Optional.
    //
    // Expects: String
    */
    favicon: projectRoot + '/static/favicon.ico'
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

    __API_ENDPOINT__: '/api',
    __API_PORT__: apiPort,
    __API_HOST__: apiHost,
    __META__: meta
  },

  /*
  // Enable eslint checks per Webpack build. Will not be run
  // on production.
  //
  // Expects: Boolean
  */  
  lint: {
    enabled: true,
    config: projectRoot + '/.eslintrc'
  },

  // babelConfig: projectRoot + '/.babelrc',

  /*
  // Enable native desktop notifications for Webpack build events.
  // Will not be run on production.
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
  // The react-router Routes file, Required. Will be added to Webpack aliases.
  */
  routes: sourceRoot + '/routes.js',

  redux: {
    /*
    // The path to the index of your Redux reducers. Required. Will be added
    // to Webpcak aliases.
    */
    reducers: sourceRoot + '/redux/modules/reducer.js',

    /*
    // A path to an index of middleware functions. On the serverside, these will
    // be called with the Express request and response. Optional.
    //
    // Expects: String
    */
    middleware: sourceRoot + '/redux/middleware/index.js'
  },

  /*
  // The path to your replacement for the default HTML shell. Optional.
  // If not provided, the default used will be that in src/helpers/Html.js.
  // Will be added to Webpack aliases.
  */
  // htmlShell: sourceRoot + '/helpers/Html.js',

  webpack: {

    /*
    // Whether to merge into the default webpack configuration using
    // webpack-config-merger.
    //
    // If the `merge` parameter is `true`, properties with the same name
    // will be overwritten. Arrays will be concatenated. Objects will
    // be merged.
    //
    // If the `merge` parameter is `false`, default webpack settings
    // will not be used and the config specified here will need to 
    // be the complete settings required for building.
    */  
    merge: true,

    /*
    // Webpack configuration cusomtizations. There are more parameters
    // available than specified here. For the full list, see 
    // https://webpack.github.io/docs/configuration.html.
    */  
    config: {

      /*
      // The Webpack devtool configuration. May affect build times.
      // See https://webpack.github.io/docs/configuration.html#devtool
      */
      devtool: 'inline-eval-cheap-source-map',

      entry: {
        main: [
          'bootstrap-sass!' + sourceRoot + '/theme/bootstrap.config' + (isProduction ? '.prod' : '') + '.js',
          'font-awesome-webpack!' + sourceRoot + '/theme/font-awesome.config' + (isProduction ? '.prod' : '') + '.js'
        ]
      },

      /*
      // Not recommended to change.
      */
      context: projectRoot,

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
        root: sourceRoot
      }
    }
  }
};
/* eslint-enable */
