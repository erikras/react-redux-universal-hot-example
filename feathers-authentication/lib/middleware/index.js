'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sockets = require('./sockets');

var _exposeRequestResponse = require('./express/expose-request-response');

var _exposeRequestResponse2 = _interopRequireDefault(_exposeRequestResponse);

var _tokenParser = require('./express/token-parser');

var _tokenParser2 = _interopRequireDefault(_tokenParser);

var _decodeToken = require('./express/decode-token');

var _decodeToken2 = _interopRequireDefault(_decodeToken);

var _populateUser = require('./express/populate-user');

var _populateUser2 = _interopRequireDefault(_populateUser);

var _setCookie = require('./express/set-cookie');

var _setCookie2 = _interopRequireDefault(_setCookie);

var _loginSuccess = require('./express/login-success');

var _loginSuccess2 = _interopRequireDefault(_loginSuccess);

var _notAuthenticated = require('./express/not-authenticated');

var _notAuthenticated2 = _interopRequireDefault(_notAuthenticated);

var _restrictToAuthenticated = require('./express/restrict-to-authenticated');

var _restrictToAuthenticated2 = _interopRequireDefault(_restrictToAuthenticated);

var _logout = require('./express/logout');

var _logout2 = _interopRequireDefault(_logout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  exposeRequestResponse: _exposeRequestResponse2.default,
  tokenParser: _tokenParser2.default,
  decodeToken: _decodeToken2.default,
  populateUser: _populateUser2.default,
  setCookie: _setCookie2.default,
  successfulLogin: _loginSuccess2.default,
  notAuthenticated: _notAuthenticated2.default,
  restrictToAuthenticated: _restrictToAuthenticated2.default,
  logout: _logout2.default,
  setupSocketIOAuthentication: _sockets.setupSocketIOAuthentication,
  setupPrimusAuthentication: _sockets.setupPrimusAuthentication
};
module.exports = exports['default'];