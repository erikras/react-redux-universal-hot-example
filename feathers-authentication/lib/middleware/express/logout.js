'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = logout;

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)('feathers-authentication:logout');
var defaults = {
  cookies: {
    'feathers-session': true,
    'feathers-jwt': true
  }
};

function logout() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  options = Object.assign({}, defaults, options);

  debug('Registering logout middleware with options:', options);

  return function (req, res, next) {
    req.logout = function () {
      debug('Logging out');

      var cookies = (0, _lodash2.default)(options.cookies, 'enable');

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(cookies)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          var cookie = cookies[key];

          // If the cookie is not disabled clear it   
          if (cookie) {
            debug('Clearing \'' + key + '\' cookie');
            res.clearCookie(key);
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

      delete req.app.locals.user;
    };

    next();
  };
}
module.exports = exports['default'];