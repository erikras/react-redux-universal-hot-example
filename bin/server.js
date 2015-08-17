#!/usr/bin/env node
require('../compiler'); // enables ES6 support

/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

if (__DEVELOPMENT__) {
  if (!require('piping')({
      hook: true,
      ignore: /(\/\.|~$|\.json|\.scss$)/i
    })) {
    return;
  }
}

// alternatively, if you you can skip using this and instead use this:
// (and webpack DefinePlugin for setting _client_ environment variable)
// const picture = _client_ ? require('./image.png') : webpackIsomorphicTools.require('./image.png')
var webpackConfiguration = require('../webpack/prod.config.js');
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackConfiguration, require('../webpack/webpack-isomorphic-tools'));
global.webpackIsomorphicTools.register();

require('../src/server');
