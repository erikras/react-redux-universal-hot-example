'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.populateParams = populateParams;
exports.populateHeader = populateHeader;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function populateParams() {
  return function (hook) {
    var app = hook.app;

    Object.assign(hook.params, {
      user: app.get('user'),
      token: app.get('token')
    });
  };
}

function populateHeader() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return function (hook) {
    if (hook.params.token) {
      hook.params.headers = Object.assign({}, _defineProperty({}, options.header || 'authorization', hook.params.token), hook.params.headers);
    }
  };
}