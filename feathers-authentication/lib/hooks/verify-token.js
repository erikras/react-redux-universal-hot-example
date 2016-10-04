'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return function (hook) {
    if (hook.type !== 'before') {
      throw new Error('The \'verifyToken\' hook should only be used as a \'before\' hook.');
    }

    // If it was an internal call then skip this hook
    if (!hook.params.provider) {
      return hook;
    }

    var token = hook.params.token;

    if (!token) {
      throw new _feathersErrors2.default.NotAuthenticated('Authentication token missing.');
    }

    var authOptions = hook.app.get('auth') || {};

    // Grab the token options here
    options = Object.assign({}, authOptions.token, options);

    var secret = options.secret;

    if (!secret) {
      throw new Error('You need to pass \'options.secret\' to the verifyToken() hook or set \'auth.token.secret\' it in your config.');
    }

    // Convert the algorithm value to an array
    if (options.algorithm) {
      options.algorithms = [options.algorithm];
      delete options.algorithm;
    }

    return new Promise(function (resolve, reject) {
      _jsonwebtoken2.default.verify(token, secret, options, function (error, payload) {
        if (error) {
          // Return a 401 if the token has expired or is invalid.
          return reject(new _feathersErrors2.default.NotAuthenticated(error));
        }

        // Attach our decoded token payload to the params
        hook.params.payload = payload;

        resolve(hook);
      });
    });
  };
};

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _feathersErrors = require('feathers-errors');

var _feathersErrors2 = _interopRequireDefault(_feathersErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];