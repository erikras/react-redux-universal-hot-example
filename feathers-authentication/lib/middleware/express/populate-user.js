'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = populateUser;

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)('feathers-authentication:populate-user');
var defaults = {
  user: {
    endpoint: 'users',
    idField: '_id'
  }
};

function populateUser() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  debug('Registering populateUser middleware with options:', options);

  return function (req, res, next) {
    debug('Attempting to populate user');
    var app = req.app;

    if (app.locals) {
      delete app.locals.user;
    }

    options = Object.assign({}, defaults, app.get('auth'), options);

    var hasID = req.payload && req.payload[options.user.idField] !== undefined;
    var id = hasID ? req.payload[options.user.idField] : undefined;
    var userService = options.service || app.service(options.user.endpoint);

    // If we don't have an id to look up a
    // user by then move along.
    if (id === undefined) {
      return next();
    }

    debug('Populating user ' + id);

    userService.get(id).then(function (result) {
      var user = result.toJSON ? result.toJSON() : result;

      req.user = user;
      req.feathers.user = user;

      if (app.locals) {
        app.locals.user = user;
      }

      next();
    }).catch(next);
  };
}
module.exports = exports['default'];