'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = auth;

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

var _hooks = require('./hooks/index');

var _hooks2 = _interopRequireDefault(_hooks);

var _token = require('./services/token');

var _token2 = _interopRequireDefault(_token);

var _local = require('./services/local');

var _local2 = _interopRequireDefault(_local);

var _oauth = require('./services/oauth2');

var _oauth2 = _interopRequireDefault(_oauth);

var _middleware = require('./middleware/index');

var mw = _interopRequireWildcard(_middleware);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)('feathers-authentication:main');

// Exposed modules


var THIRTY_SECONDS = 30000; // in milliseconds
var ONE_DAY = 60 * 60 * 24 * 1000; // in milliseconds

// Options that apply to any provider
var defaults = {
  header: 'Authorization',
  setupMiddleware: true, // optional - to setup middleware yourself set to false.
  cookies: {
    enable: false, // Set to true to enable all cookies
    // Used for redirects where JS can pick up the JWT and
    // store it in localStorage (ie. redirect or OAuth)
    'feathers-jwt': { // set to false to disable this cookie
      httpOnly: false,
      maxAge: THIRTY_SECONDS,
      secure: process.env.NODE_ENV === 'production'
    },
    // Used for server side rendering
    'feathers-session': { // set to false to disable this cookie
      httpOnly: true,
      // maxAge: ONE_DAY,
      maxAge: 0, // session cookie
      secure: process.env.NODE_ENV === 'production'
    }
  },
  token: {
    name: 'token', // optional
    endpoint: '/auth/token', // optional
    issuer: 'feathers', // optional
    algorithm: 'HS256', // optional
    expiresIn: '1d', // optional
    secret: null, // required
    successRedirect: null, // optional - no default. If set the default success handler will redirect to location
    failureRedirect: null, // optional - no default. If set the default success handler will redirect to location
    successHandler: null },
  // optional - a middleware to handle things once authentication succeeds
  local: {
    endpoint: '/auth/local', // optional
    successRedirect: null, // optional - no default. If set the default success handler will redirect to location
    failureRedirect: null, // optional - no default. If set the default success handler will redirect to location
    successHandler: null },
  // optional - a middleware to handle things once authentication succeeds
  user: {
    endpoint: '/users', // optional
    idField: '_id', // optional
    usernameField: 'email', // optional
    passwordField: 'password', // optional
    service: null // optional - no default. an actual service (can be client side service)
  }
};

function auth() {
  var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return function () {
    var app = this;
    var _super = app.setup;

    // If cookies are enabled then load our defaults and
    // any passed in options
    if (config.cookies && config.cookies.enable) {
      config.cookies = Object.assign({}, defaults.cookies, config.cookies);
    }

    // Merge and flatten options
    var authOptions = (0, _lodash2.default)(defaults, app.get('auth'), config);

    // NOTE (EK): Currently we require token based auth so
    // if the developer didn't provide a config for our token
    // provider then we'll set up a sane default for them.
    if (!authOptions.token.secret) {
      throw new Error('You must provide a token secret in your config via \'auth.token.secret\'.');
    }

    // Set the options on the app
    app.set('auth', authOptions);

    // REST middleware
    if (app.rest && authOptions.setupMiddleware) {
      debug('registering REST authentication middleware');

      // Be able to parse cookies it that is enabled
      if (authOptions.cookies.enable) {
        app.use((0, _cookieParser2.default)());
      }

      // Expose Express req & res objects to hooks and services
      app.use(mw.exposeRequestResponse(authOptions));
      // Parse token from header, cookie, or request objects
      app.use(mw.tokenParser(authOptions));
      // Verify and decode a JWT if it is present
      app.use(mw.decodeToken(authOptions));
      // Make the Passport user available for REST services.
      app.use(mw.populateUser(authOptions));
      // Register server side logout middleware
      app.use(mw.logout(authOptions));
    } else if (app.rest) {
      debug('Not registering REST authentication middleware. Did you disable it on purpose?');
    }

    debug('registering passport middleware');
    app.use(_passport2.default.initialize());

    app.setup = function () {
      var result = _super.apply(this, arguments);

      // Socket.io middleware
      if (app.io && authOptions.setupMiddleware) {
        debug('registering Socket.io authentication middleware');
        app.io.on('connection', mw.setupSocketIOAuthentication(app, authOptions));
      } else if (app.primus) {
        debug('Not registering Socket.io authentication middleware. Did you disable it on purpose?');
      }

      // Primus middleware
      if (app.primus && authOptions.setupMiddleware) {
        debug('registering Primus authentication middleware');
        app.primus.on('connection', mw.setupPrimusAuthentication(app, authOptions));
      } else if (app.primus) {
        debug('Not registering Primus authentication middleware. Did you disable it on purpose?');
      }

      return result;
    };
  };
}

// Exposed Modules
auth.hooks = _hooks2.default;
auth.middleware = mw;
auth.LocalService = _local2.default;
auth.TokenService = _token2.default;
auth.OAuth2Service = _oauth2.default;
module.exports = exports['default'];