'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tokenParser;

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Make sure than an auth token passed in is available for hooks
// and services. This gracefully falls back from
// header -> cookie (optional) -> body -> query string

var debug = (0, _debug2.default)('feathers-authentication:token-parser');
var defaults = {
  header: 'Authorization',
  token: {
    name: 'token'
  },
  cookies: {}
};

function tokenParser() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  options = Object.assign({}, defaults, options);
  var name = options.token.name;

  if (!options.header) {
    throw new Error('\'header\' must be provided to tokenParser() middleware');
  }

  if (!name) {
    throw new Error('\'options.token.name\' must be provided to tokenParser() middleware');
  }

  debug('Registering tokenParser middleware with options:', options);

  return function (req, res, next) {
    debug('Parsing token');
    var app = req.app;

    // Normalize header capitalization the same way Node.js does
    var token = req.headers[options.header.toLowerCase()];

    // Check the header for the token (preferred method)
    if (token) {
      // if the value contains "bearer" or "Bearer" then cut that part out
      if (/bearer/i.test(token)) {
        token = token.split(' ')[1];
      }

      debug('Token found in header');
    }

    // Check the cookie if we are haven't found a token already
    // and cookies are enabled.
    if (!token && options.cookies.enable && req.cookies) {
      var cookies = (0, _lodash2.default)(options.cookies, 'enable');

      // Loop through our cookies and see if we have an
      // enabled one with a token.
      //
      // TODO (EK): This will stop at the first one found.
      // This may be a problem.
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(cookies)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          // If cookies are enabled and one of our expected
          // ones was sent then grab the token from it.
          if (cookies[key] && req.cookies[key]) {
            debug('Token found in cookie \'' + key + '\'');
            token = req.cookies[key];
            break;
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
    // Check the body next if we still don't have a token
    else if (req.body[name]) {
        debug('Token found in req.body');
        token = req.body[name];
        delete req.body[name];
      }
      // Finally, check the query string. (worst method but nice for quick local dev)
      else if (req.query[name] && app.env !== 'production') {
          debug('Token found in req.query');
          token = req.query[name];
          delete req.query[name];

          console.warn('You are passing your token in the query string. This isn\'t very secure and is not recommended.');
          console.warn('Instead you should pass it as an Authorization header. See docs.feathersjs.com for more details.');
        }

    // Tack it on to our express and feathers request object
    // so that it is passed to hooks and services.
    req.feathers[name] = token;
    req[name] = token;

    next();
  };
}
module.exports = exports['default'];