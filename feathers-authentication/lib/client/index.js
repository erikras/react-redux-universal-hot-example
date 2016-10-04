'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var config = Object.assign({}, defaults, opts);

  return function () {
    var app = this;

    if (!app.get('storage')) {
      app.set('storage', (0, _utils.getStorage)(config.storage));
    }

    app.authenticate = function () {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var storage = this.get('storage');
      var getOptions = Promise.resolve(options);

      // If no type was given let's try to authenticate with a stored JWT
      if (!options.type) {
        getOptions = (0, _utils.getJWT)(config.tokenKey, config.cookie, this.get('storage')).then(function (token) {
          if (!token) {
            return Promise.reject(new _feathersErrors2.default.NotAuthenticated('Could not find stored JWT and no authentication type was given'));
          }

          return { type: 'token', token: token };
        });
      }

      var handleResponse = function handleResponse(response) {
        app.set('token', response.token);
        app.set('user', response.user);

        return Promise.resolve(storage.setItem(config.tokenKey, response.token)).then(function () {
          return response;
        });
      };

      return getOptions.then(function (options) {
        var endPoint = void 0;

        if (options.type === 'local') {
          endPoint = config.localEndpoint;
        } else if (options.type === 'token') {
          endPoint = config.tokenEndpoint;
        } else {
          throw new Error('Unsupported authentication \'type\': ' + options.type);
        }

        return (0, _utils.connected)(app).then(function (socket) {
          // TODO (EK): Handle OAuth logins
          // If we are using a REST client
          if (app.rest) {
            return app.service(endPoint).create(options).then(handleResponse);
          }

          var method = app.io ? 'emit' : 'send';

          return (0, _utils.authenticateSocket)(options, socket, method).then(handleResponse);
        });
      });
    };

    // Set our logout method with the correct socket context
    app.logout = function () {
      app.set('user', null);
      app.set('token', null);

      (0, _utils.clearCookie)(config.cookie);

      // remove the token from localStorage
      return Promise.resolve(app.get('storage').removeItem(config.tokenKey)).then(function () {
        // If using sockets de-authenticate the socket
        if (app.io || app.primus) {
          var method = app.io ? 'emit' : 'send';
          var socket = app.io ? app.io : app.primus;

          return (0, _utils.logoutSocket)(socket, method);
        }
      });
    };

    // Set up hook that adds token and user to params so that
    // it they can be accessed by client side hooks and services
    app.mixins.push(function (service) {
      if (typeof service.before !== 'function' || typeof service.after !== 'function') {
        throw new Error('It looks like feathers-hooks isn\'t configured. It is required before running feathers-authentication.');
      }

      service.before(hooks.populateParams(config));
    });

    // Set up hook that adds authorization header for REST provider
    if (app.rest) {
      app.mixins.push(function (service) {
        service.before(hooks.populateHeader(config));
      });
    }
  };
};

var _feathersErrors = require('feathers-errors');

var _feathersErrors2 = _interopRequireDefault(_feathersErrors);

var _hooks = require('./hooks');

var hooks = _interopRequireWildcard(_hooks);

var _utils = require('./utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaults = {
  cookie: 'feathers-jwt',
  tokenKey: 'feathers-jwt',
  localEndpoint: '/auth/local',
  tokenEndpoint: '/auth/token'
};

module.exports = exports['default'];