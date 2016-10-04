'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exposeRequestResponse;

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)('feathers-authentication:expose-request-response');

// Usually this is a big no no but passport requires the
// request object to inspect req.body and req.query so we
// need to miss behave a bit. Don't do this in your own code!
function exposeRequestResponse() {
  debug('Registering exposeRequestResponse middleware');

  return function (req, res, next) {
    debug('Exposing request and response objects to Feathers');
    req.feathers = req.feathers || {};
    req.feathers.req = req;
    req.feathers.res = res;
    next();
  };
}
module.exports = exports['default'];