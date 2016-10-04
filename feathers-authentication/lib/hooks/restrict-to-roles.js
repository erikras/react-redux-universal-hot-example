'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  if (!options.roles || !options.roles.length) {
    throw new Error('You need to provide an array of \'roles\' to check against.');
  }

  return function (hook) {
    var _this = this;

    if (hook.type !== 'before') {
      throw new Error('The \'restrictToRoles\' hook should only be used as a \'before\' hook.');
    }

    // If it was an internal call then skip this hook
    if (!hook.params.provider) {
      return hook;
    }

    if (!hook.params.user) {
      // TODO (EK): Add a debugger call to remind the dev to check their hook chain
      // as they probably don't have the right hooks in the right order.
      throw new _feathersErrors2.default.NotAuthenticated();
    }

    options = Object.assign({}, defaults, hook.app.get('auth'), options);

    var authorized = false;
    var roles = hook.params.user[options.fieldName];
    var id = hook.params.user[options.idField];
    var error = new _feathersErrors2.default.Forbidden('You do not have valid permissions to access this.');

    if (id === undefined) {
      throw new Error('\'' + options.idField + ' is missing from current user.\'');
    }

    // If the user doesn't even have a `fieldName` field and we're not checking
    // to see if they own the requested resource return Forbidden error
    if (!options.owner && roles === undefined) {
      throw error;
    }

    // If the roles is not an array, normalize it
    if (!Array.isArray(roles)) {
      roles = [roles];
    }

    // Iterate through all the roles the user may have and check
    // to see if any one of them is in the list of permitted roles.
    authorized = roles.some(function (role) {
      return options.roles.indexOf(role) !== -1;
    });

    // If we should allow users that own the resource and they don't already have
    // the permitted roles check to see if they are the owner of the requested resource
    if (options.owner && !authorized) {
      if (!hook.id) {
        throw new _feathersErrors2.default.MethodNotAllowed('The \'restrictToRoles\' hook should only be used on the \'get\', \'update\', \'patch\' and \'remove\' service methods if you are using the \'owner\' field.');
      }

      // look up the document and throw a Forbidden error if the user is not an owner
      return new Promise(function (resolve, reject) {
        // Set provider as undefined so we avoid an infinite loop if this hook is
        // set on the resource we are requesting.
        var params = Object.assign({}, hook.params, { provider: undefined });

        _this.get(hook.id, params).then(function (data) {
          if (data.toJSON) {
            data = data.toJSON();
          } else if (data.toObject) {
            data = data.toObject();
          }

          var field = data[options.ownerField];

          // Handle nested Sequelize or Mongoose models
          if ((0, _lodash2.default)(field)) {
            field = field[options.idField];
          }

          if (field === undefined || field.toString() !== id.toString()) {
            reject(new _feathersErrors2.default.Forbidden('You do not have the permissions to access this.'));
          }

          resolve(hook);
        }).catch(reject);
      });
    }

    if (!authorized) {
      throw error;
    }
  };
};

var _feathersErrors = require('feathers-errors');

var _feathersErrors2 = _interopRequireDefault(_feathersErrors);

var _lodash = require('lodash.isplainobject');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaults = {
  fieldName: 'roles',
  idField: '_id',
  ownerField: 'userId',
  owner: false
};

module.exports = exports['default'];