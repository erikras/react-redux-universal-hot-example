'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _feathersErrors = require('feathers-errors');

var _feathersErrors2 = _interopRequireDefault(_feathersErrors);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)('feathers-authentication:decode-token');

module.exports = function () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  debug('Registering decodeToken middleware with options:', options);

  return function (req, res, next) {
    var token = req.feathers.token;

    // If no token present then move along
    if (!token) {
      return next();
    }

    debug('Decoding token');

    var authOptions = req.app.get('auth') || {};

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

    _jsonwebtoken2.default.verify(token, secret, options, function (error, payload) {
      if (error) {
        // If the token errors then we won't have a payload so we can
        // just proceed. The actual verification should be done by
        // the restrictToAuthenticated middleware or hook.
        return next();
      }

      // Attach our decoded token payload to the request objects and
      // expose to feathers hooks and services via hook.params.payload.
      req.payload = payload;
      req.feathers.payload = payload;

      next();
    });
  };
};