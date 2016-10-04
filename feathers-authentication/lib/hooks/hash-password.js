'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return function (hook) {
    if (hook.type !== 'before') {
      throw new Error('The \'hashPassword\' hook should only be used as a \'before\' hook.');
    }

    options = Object.assign({}, defaults, hook.app.get('auth'), options);

    var crypto = options.bcrypt || _bcryptjs2.default;

    if (hook.data === undefined) {
      return hook;
    }

    var password = void 0;
    if (Array.isArray(hook.data)) {
      // make sure we actually have password fields
      var dataToCheck = [].concat(hook.data);
      dataToCheck.filter(function (item) {
        return item.hasOwnProperty(options.passwordField);
      });
      if (dataToCheck.length > 0) {
        // set it to the array so we can iterate later on it
        password = hook.data;
      }
    } else {
      password = hook.data[options.passwordField];
    }

    if (password === undefined) {
      // If it was an internal call then move along otherwise
      // throw an error that password is required.
      if (!hook.params.provider) {
        return hook;
      }

      throw new _feathersErrors2.default.BadRequest('\'' + options.passwordField + '\' field is missing.');
    }

    return new Promise(function (resolve, reject) {
      var hash = function hash(item, password, salt) {
        crypto.hash(password, salt, function (error, hash) {
          if (error) {
            return reject(error);
          }
          item[options.passwordField] = hash;
          resolve(hook);
        });
      };
      crypto.genSalt(10, function (error, salt) {
        if (Array.isArray(password)) {
          password.map(function (item) {
            if (!item.hasOwnProperty(options.passwordField)) {
              return false;
            }
            hash(item, item[options.passwordField], salt);
          });
        } else {
          hash(hook.data, password, salt);
        }
      });
    });
  };
};

var _feathersErrors = require('feathers-errors');

var _feathersErrors2 = _interopRequireDefault(_feathersErrors);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaults = { passwordField: 'password' };

module.exports = exports['default'];