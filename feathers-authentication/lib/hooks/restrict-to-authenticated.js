'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return function (hook) {
    if (hook.type !== 'before') {
      throw new Error('The \'restrictToAuthenticated\' hook should only be used as a \'before\' hook.');
    }

    if (hook.params.provider && hook.params.user === undefined) {
      throw new _feathersErrors2.default.NotAuthenticated('You are not authenticated.');
      // TODO (EK): Add debug log to check to see if the user is populated, if the token was verified and warn appropriately
    }
  };
};

var _feathersErrors = require('feathers-errors');

var _feathersErrors2 = _interopRequireDefault(_feathersErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];