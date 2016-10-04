'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _associateCurrentUser = require('./associate-current-user');

var _associateCurrentUser2 = _interopRequireDefault(_associateCurrentUser);

var _hashPassword = require('./hash-password');

var _hashPassword2 = _interopRequireDefault(_hashPassword);

var _populateUser = require('./populate-user');

var _populateUser2 = _interopRequireDefault(_populateUser);

var _queryWithCurrentUser = require('./query-with-current-user');

var _queryWithCurrentUser2 = _interopRequireDefault(_queryWithCurrentUser);

var _restrictToAuthenticated = require('./restrict-to-authenticated');

var _restrictToAuthenticated2 = _interopRequireDefault(_restrictToAuthenticated);

var _restrictToOwner = require('./restrict-to-owner');

var _restrictToOwner2 = _interopRequireDefault(_restrictToOwner);

var _restrictToRoles = require('./restrict-to-roles');

var _restrictToRoles2 = _interopRequireDefault(_restrictToRoles);

var _verifyToken = require('./verify-token');

var _verifyToken2 = _interopRequireDefault(_verifyToken);

var _verifyOrRestrict = require('./verify-or-restrict');

var _verifyOrRestrict2 = _interopRequireDefault(_verifyOrRestrict);

var _populateOrRestrict = require('./populate-or-restrict');

var _populateOrRestrict2 = _interopRequireDefault(_populateOrRestrict);

var _hasRoleOrRestrict = require('./has-role-or-restrict');

var _hasRoleOrRestrict2 = _interopRequireDefault(_hasRoleOrRestrict);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hooks = {
  associateCurrentUser: _associateCurrentUser2.default,
  hashPassword: _hashPassword2.default,
  populateUser: _populateUser2.default,
  queryWithCurrentUser: _queryWithCurrentUser2.default,
  restrictToAuthenticated: _restrictToAuthenticated2.default,
  restrictToOwner: _restrictToOwner2.default,
  restrictToRoles: _restrictToRoles2.default,
  verifyToken: _verifyToken2.default,
  verifyOrRestrict: _verifyOrRestrict2.default,
  populateOrRestrict: _populateOrRestrict2.default,
  hasRoleOrRestrict: _hasRoleOrRestrict2.default
};

exports.default = hooks;
module.exports = exports['default'];