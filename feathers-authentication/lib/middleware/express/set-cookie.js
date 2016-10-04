'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setCookie;

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)('feathers-authentication:set-cookie');
var defaults = {
  cookies: {}
};

// TODO (EK): Support session cookies for server side rendering
// need to differentiate between the JavaScript accessible JWT cookie
// and the HTTP only session cookie.

function setCookie() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  options = Object.assign({}, defaults, options);

  debug('Registering setCookie middleware with options:', options);

  if (options.cookies === undefined) {
    throw new Error('\'options.cookies\' must be provided to setCookie() middleware or explicitly set to \'false\'');
  }

  return function (req, res, next) {
    var app = req.app;

    // NOTE (EK): If we are not dealing with a browser or it was an
    // XHR request then just skip this. This is primarily for
    // handling the oauth redirects and for us to securely send the
    // JWT to the client in a cookie.
    if (req.xhr || req.is('json') || !req.accepts('html')) {
      return next();
    }

    // If cookies are enabled go through each one and if it
    // is enabled then set it with it's options.
    if (options.cookies && options.cookies.enable) {
      debug('Attempting to set cookies');

      var cookies = (0, _lodash2.default)(options.cookies, 'enable');

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(cookies)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var name = _step.value;

          var cookie = cookies[name];

          // If the cookie is not disabled clear it   
          if (cookie) {
            var cookieOptions = Object.assign({}, cookie);
            debug('Clearing old \'' + name + '\' cookie');

            // clear any previous cookie
            res.clearCookie(name);

            // Check HTTPS and cookie status in production.
            if (!req.secure && app.env === 'production' && cookie.secure) {
              console.warn('WARN: Request isn\'t served through HTTPS: JWT in the cookie is exposed.');
              console.info('If you are behind a proxy (e.g. NGINX) you can:');
              console.info('- trust it: http://expressjs.com/en/guide/behind-proxies.html');
              console.info('- set cookie[\'' + name + '\'].secure false');
            }

            // If a custom expiry wasn't passed then set the expiration
            // to be the default maxAge of the respective cookie otherwise it
            // will just become a session cookie.
            if (cookieOptions.expires === undefined && cookieOptions.maxAge) {
              var expiry = new Date(Date.now() + cookieOptions.maxAge);
              cookieOptions.expires = expiry;
            }

            if (cookieOptions.expires && !(cookieOptions.expires instanceof Date)) {
              throw new Error('cookie.expires must be a valid Date object');
            }

            // remove the maxAge because we have set an explicit expiry
            delete cookieOptions.maxAge;

            debug('Setting \'' + name + '\' cookie');
            res.cookie(name, res.data.token, cookieOptions);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    next();
  };
}
module.exports = exports['default'];