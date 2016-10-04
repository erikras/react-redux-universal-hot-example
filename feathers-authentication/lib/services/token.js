'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Service = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (options) {
  return function () {
    var app = this;
    var authConfig = Object.assign({}, app.get('auth'), options);
    var passwordField = authConfig.user.passwordField;


    options = (0, _lodash2.default)(defaults, authConfig.token, options, { passwordField: passwordField });

    var successHandler = options.successHandler || _middleware.successfulLogin;

    debug('configuring token authentication service with options', options);

    // Initialize our service with any options it requires
    app.use(options.endpoint, new Service(options), (0, _middleware.setCookie)(authConfig), successHandler(options));
  };
};

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _hooks = require('../hooks/index');

var _hooks2 = _interopRequireDefault(_hooks);

var _feathersHooks = require('feathers-hooks');

var _feathersHooks2 = _interopRequireDefault(_feathersHooks);

var _feathersErrors = require('feathers-errors');

var _feathersErrors2 = _interopRequireDefault(_feathersErrors);

var _middleware = require('../middleware/index');

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var debug = (0, _debug2.default)('feathers-authentication:token');

// Provider specific config
var defaults = {
  endpoint: '/auth/token',
  idField: '_id',
  passwordField: 'password',
  issuer: 'feathers',
  subject: 'auth',
  algorithm: 'HS256',
  expiresIn: '1d', // 1 day
  payload: []
};

/**
 * Verifies that a JWT token is valid. This is a private hook.
 *
 * @param  {Object} options - An options object
 * @param {String} options.secret - The JWT secret
 */
var _verifyToken = function _verifyToken() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var secret = options.secret;

  return function (hook) {
    return new Promise(function (resolve, reject) {
      // If it was an internal call just skip
      if (!hook.params.provider) {
        hook.params.data = hook.data;
        return resolve(hook);
      }

      debug('Verifying token');

      var token = hook.params.token;

      _jsonwebtoken2.default.verify(token, secret, options, function (error, payload) {
        if (error) {
          // Return a 401 if the token has expired.
          return reject(new _feathersErrors2.default.NotAuthenticated(error));
        }

        // Normalize our params with the token in it.
        hook.data = payload;
        hook.params.data = Object.assign({}, hook.data, payload, { token: token });
        hook.params.query = Object.assign({}, hook.params.query, { token: token });
        resolve(hook);
      });
    });
  };
};

var Service = exports.Service = function () {
  function Service() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Service);

    this.options = options;
  }

  // GET /auth/token
  // This is sort of a dummy route that we are using just to verify
  // that our token is correct by running our verifyToken hook. It
  // doesn't refresh our token it just returns our existing one with
  // our user data.
  // find(params) {
  //   if (params.data && params.data.token) {
  //     const token = params.data.token;
  //     delete params.data.token;

  //     return Promise.resolve({
  //       token: token,
  //       data: params.data
  //     });
  //   }

  //   return Promise.reject(new errors.GeneralError('Something weird happened'));
  // }

  // GET /auth/token/refresh


  _createClass(Service, [{
    key: 'get',
    value: function get(id, params) {
      if (id !== 'refresh') {
        return Promise.reject(new _feathersErrors2.default.NotFound());
      }

      var options = this.options;
      var data = params;
      // Our before hook determined that we had a valid token or that this
      // was internally called so let's generate a new token with the user
      // id and return both the ID and the token.
      return new Promise(function (resolve) {
        _jsonwebtoken2.default.sign(data, options.secret, options, function (token) {
          return resolve(Object.assign(data, { token: token }));
        });
      });
    }

    // POST /auth/token

  }, {
    key: 'create',
    value: function create(data, params) {
      var _Object$assign = Object.assign({}, this.options, params.jwt);

      var algorithm = _Object$assign.algorithm;
      var expiresIn = _Object$assign.expiresIn;
      var notBefore = _Object$assign.notBefore;
      var audience = _Object$assign.audience;
      var issuer = _Object$assign.issuer;
      var jwtid = _Object$assign.jwtid;
      var subject = _Object$assign.subject;
      var noTimestamp = _Object$assign.noTimestamp;
      var header = _Object$assign.header;
      // const payload = this.options.payload;

      var secret = this.options.secret;
      var options = {
        algorithm: algorithm,
        expiresIn: expiresIn,
        notBefore: notBefore,
        audience: audience,
        issuer: issuer,
        jwtid: jwtid,
        subject: subject,
        noTimestamp: noTimestamp,
        header: header
      };

      // const data = {
      //   [this.options.idField]: payload[this.options.idField]
      // };

      // // Add any additional payload fields
      // if (payload && Array.isArray(payload)) {
      //   payload.forEach(field => data[field] = payload[field]);
      // }

      // Our before hook determined that we had a valid token or that this
      // was internally called so let's generate a new token with the user
      // id and return both the ID and the token.
      return new Promise(function (resolve, reject) {
        debug('Creating JWT using options:', options);

        _jsonwebtoken2.default.sign(data, secret, options, function (error, token) {
          if (error) {
            debug('Error signing JWT');
            return reject(error);
          }

          debug('New JWT issued with payload', data);
          return resolve({ token: token });
        });
      });
    }
  }, {
    key: 'setup',
    value: function setup() {
      var options = this.options;

      // Set up our before hooks
      this.before({
        create: [_verifyToken(options)],
        find: [_verifyToken(options)],
        get: [_verifyToken(options)]
      });

      // TODO (EK): I'm not sure these should be done automatically
      // I think this should be left up to the developer or the
      // generator.
      this.after({
        create: [_hooks2.default.populateUser(), _feathersHooks2.default.remove(options.passwordField, function () {
          return true;
        })],
        find: [_hooks2.default.populateUser(), _feathersHooks2.default.remove(options.passwordField, function () {
          return true;
        })],
        get: [_hooks2.default.populateUser(), _feathersHooks2.default.remove(options.passwordField, function () {
          return true;
        })]
      });

      // prevent regular service events from being dispatched
      if (typeof this.filter === 'function') {
        this.filter(function () {
          return false;
        });
      }
    }
  }]);

  return Service;
}();