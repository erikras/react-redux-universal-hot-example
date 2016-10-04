'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = notAuthenticated;

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)('feathers-authentication:not-authenticated');

function notAuthenticated() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  debug('Registering notAuthenticated middleware with options:', options);

  return function (error, req, res, next) {
    debug('An authentication error occurred.', error);

    // clear any previous JWT cookie
    // if (options.cookie) {
    //   res.clearCookie(options.cookie.name);
    // }

    // NOTE (EK): If we are not dealing with a browser or it was an
    // XHR request then just skip this. This is primarily for
    // handling redirecting on an oauth failure.
    // console.log('Auth Error', error, options);
    // if (!options.failureRedirect || req.xhr || req.is('json') || !req.accepts('html')) {
    //   return next(error);
    // }

    if (error.code === 401 && options.failureRedirect !== undefined) {
      return res.redirect(options.failureRedirect);
    }

    next(error);
  };
}
module.exports = exports['default'];