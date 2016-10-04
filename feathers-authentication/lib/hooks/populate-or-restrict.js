'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return function (hook) {
    var id = void 0;

    options = Object.assign({}, defaults, hook.app.get('auth'), options);

    // If it's an after hook grab the id from the result
    if (hook.type !== 'before') {
      throw new Error('The \'populateOrRestrict\' hook should only be used as a \'before\' hook.');
    }

    if (hook.method !== 'find' && hook.method !== 'get') {
      throw new Error('\'populateOrRestrict\' should only be used in a find or get hook.');
    }

    // If it was an internal call then skip this hook
    if (!hook.params.provider) {
      return hook;
    }

    // If we don't have a payload we have to always use find instead of get because we must not return id queries that are unrestricted and we don't want the developer to have to add after hooks.
    var query = Object.assign({}, hook.params.query, options.restrict);

    // Set provider as undefined so we avoid an infinite loop if this hook is
    // set on the resource we are requesting.
    var params = Object.assign({}, hook.params, { provider: undefined });

    if (hook.id !== null && hook.id !== undefined) {
      var _id = {};
      _id[options.idField] = hook.id;
      query = Object.assign(query, _id);
    }

    // Check to see if we have an id from a decoded JWT
    if (hook.params.payload) {
      id = hook.params.payload[options.idField];
    } else {
      if (hook.result) {
        return hook;
      }

      return this.find({ query: query }, params).then(function (results) {
        if (hook.method === 'get' && Array.isArray(results) && results.length === 1) {
          hook.result = results[0];
          return hook;
        } else {
          hook.result = results;
          return hook;
        }
      }).catch(function () {
        throw new _feathersErrors2.default.NotFound('No record found');
      });
    }

    // If we didn't find an id then just pass through
    if (id === undefined) {
      return Promise.resolve(hook);
    }

    return new Promise(function (resolve) {
      var _this = this;

      hook.app.service(options.userEndpoint).get(id, {}).then(function (user) {
        // attach the user to the hook for use in other hooks or services
        hook.params.user = user;

        // If it's an after hook attach the user to the response
        if (hook.result) {
          hook.result.data = Object.assign({}, user = !user.toJSON ? user : user.toJSON());

          // remove the id field from the root, it already exists inside the user object
          delete hook.result[options.idField];
        }

        return resolve(hook);
      }).catch(function () {

        if (hook.result) {
          return hook;
        }

        return _this.find({ query: query }, params).then(function (results) {
          if (hook.method === 'get' && Array.isArray(results) && results.length === 1) {
            hook.result = results[0];
            return hook;
          } else {
            hook.result = results;
            return hook;
          }
        }).catch(function () {
          throw new _feathersErrors2.default.NotFound('No record found');
        });
      });
    });
  };
};

var _feathersErrors = require('feathers-errors');

var _feathersErrors2 = _interopRequireDefault(_feathersErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Populate the current user associated with the JWT
 */
var defaults = {
  userEndpoint: '/users',
  idField: '_id'
};

module.exports = exports['default'];