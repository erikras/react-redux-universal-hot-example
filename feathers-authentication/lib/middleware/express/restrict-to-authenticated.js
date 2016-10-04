'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = restrictToAuthenticated;

var _feathersErrors = require('feathers-errors');

var _feathersErrors2 = _interopRequireDefault(_feathersErrors);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)('feathers-authentication:restrict-to-authenticated');

function restrictToAuthenticated(req, res, next) {
  debug('Checking for authenticated user');

  if (req.user) {
    return next();
  }

  next(new _feathersErrors2.default.NotAuthenticated());
}
module.exports = exports['default'];