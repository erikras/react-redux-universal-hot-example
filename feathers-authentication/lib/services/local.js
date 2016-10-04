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
    var userEndpoint = authConfig.user.endpoint;

    if (authConfig.token === undefined) {
      throw new Error('The TokenService needs to be configured before OAuth');
    }

    var tokenEndpoint = authConfig.token.endpoint;

    // TODO (EK): Support pulling in a user and token service directly
    // in order to talk to remote services.

    var _authConfig$user = authConfig.user;
    var idField = _authConfig$user.idField;
    var passwordField = _authConfig$user.passwordField;
    var usernameField = _authConfig$user.usernameField;


    options = (0, _lodash2.default)(defaults, authConfig.local, options, { idField: idField, passwordField: passwordField, usernameField: usernameField, userEndpoint: userEndpoint, tokenEndpoint: tokenEndpoint });

    var successHandler = options.successHandler || _middleware.successfulLogin;

    debug('configuring local authentication service with options', options);

    // Initialize our service with any options it requires
    app.use(options.endpoint, new Service(options), (0, _middleware.setCookie)(authConfig), successHandler(options));
  };
};

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _feathersErrors = require('feathers-errors');

var _feathersErrors2 = _interopRequireDefault(_feathersErrors);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

var _middleware = require('../middleware/index');

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var debug = (0, _debug2.default)('feathers-authentication:local');
var defaults = {
  endpoint: '/auth/local',
  tokenEndpoint: '/auth/local',
  userEndpoint: '/users',
  idField: '_id',
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: false
};

// successHandler: null //optional - a middleware to call when successfully authenticated

var Service = exports.Service = function () {
  function Service() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Service);

    this.options = options;
  }

  _createClass(Service, [{
    key: 'buildCredentials',
    value: function buildCredentials(req, username) {
      var usernameField = this.options.usernameField;
      return new Promise(function (resolve) {
        var params = {
          query: _defineProperty({}, usernameField, username)
        };
        resolve(params);
      });
    }
  }, {
    key: 'checkCredentials',
    value: function checkCredentials(req, username, password, done) {
      var _this = this;

      debug('Checking credentials');

      this.app.service(this.options.endpoint).buildCredentials(req, username, password)
      // Look up the user
      .then(function (params) {
        return _this.app.service(_this.options.userEndpoint).find(params);
      }).then(function (users) {
        // Paginated services return the array of results in the data attribute.
        var user = users[0] || users.data && users.data[0];

        // Handle bad username.
        if (!user) {
          return done(null, false);
        }

        debug('User found');
        return user;
      }).then(function (user) {
        var crypto = _this.options.bcrypt || _bcryptjs2.default;
        // Check password
        var hash = user[_this.options.passwordField];

        if (!hash) {
          return done(new Error('User record in the database is missing a \'' + _this.options.passwordField + '\''));
        }

        debug('Verifying password');

        crypto.compare(password, hash, function (error, result) {
          // Handle 500 server error.
          if (error) {
            return done(error);
          }

          debug('Password correct');
          return done(null, result ? user : false);
        });
      }).catch(done);
    }

    // POST /auth/local

  }, {
    key: 'create',
    value: function create(data, params) {
      var options = this.options;
      var app = this.app;

      // Validate username and password, then generate a JWT and return it
      return new Promise(function (resolve, reject) {
        var middleware = _passport2.default.authenticate('local', { session: options.session }, function (error, user) {
          if (error) {
            return reject(error);
          }

          // Login failed.
          if (!user) {
            return reject(new _feathersErrors2.default.NotAuthenticated('Invalid login.'));
          }

          debug('User authenticated via local authentication');

          var tokenPayload = _defineProperty({}, options.idField, user[options.idField]);

          // Get a new JWT and the associated user from the Auth token service and send it back to the client.
          return app.service(options.tokenEndpoint).create(tokenPayload, { user: user }).then(resolve).catch(reject);
        });

        middleware(params.req);
      });
    }
  }, {
    key: 'setup',
    value: function setup(app) {
      // attach the app object to the service context
      // so that we can call other services
      this.app = app;

      // Register our local auth strategy and get it to use the passport callback function
      debug('registering passport-local strategy');
      _passport2.default.use(new _passportLocal.Strategy(this.options, this.checkCredentials.bind(this)));

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