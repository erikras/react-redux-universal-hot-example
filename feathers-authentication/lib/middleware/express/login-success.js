"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loginSuccess;
// import Debug from 'debug';

// const debug = Debug('feathers-authentication:login-success');

function loginSuccess() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return function (req, res, next) {
    if (options.successRedirect !== undefined) {
      return res.redirect(options.successRedirect);
    }

    next();
  };
}
module.exports = exports["default"];