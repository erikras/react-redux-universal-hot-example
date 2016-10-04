'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = function () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return function (hook) {

    if (hook.type !== 'before') {
      throw new Error('The \'verifyOrRestrict\' hook should only be used as a \'before\' hook.');
    }

    if (hook.method !== 'find' && hook.method !== 'get') {
      throw new Error('\'verifyOrRestrict\' should only be used in a find or get hook.');
    }

    // If it was an internal call then skip this hook
    if (!hook.params.provider) {
      return hook;
    }

    var token = hook.params.token;

    var authOptions = hook.app.get('auth') || {};

    // Grab the token options here
    options = Object.assign({}, authOptions, authOptions.token, options);

    if (!token) {

      // We have to always use find instead of get because we must not return id queries that are unrestricted and we don't want the developer to have to add after hooks.
      var query = Object.assign({}, hook.params.query, options.restrict);

      // Set provider as undefined so we avoid an infinite loop if this hook is
      // set on the resource we are requesting.
      var params = Object.assign({}, hook.params, { provider: undefined });

      if (hook.id !== null && hook.id !== undefined) {
        var id = {};
        id[options.idField] = hook.id;
        query = Object.assign(query, id);
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
    } else {
      var _ret = function () {

        var secret = options.secret;

        if (!secret) {
          throw new Error('You need to pass \'options.secret\' to the verifyToken() hook or set \'auth.token.secret\' it in your config.');
        }

        // Convert the algorithm value to an array
        if (options.algorithm) {
          options.algorithms = [options.algorithm];
          delete options.algorithm;
        }

        return {
          v: new Promise(function (resolve, reject) {
            _jsonwebtoken2.default.verify(token, secret, options, function (error, payload) {
              if (error) {
                // If the user is trying to add a token then it is better to throw and error than let the request go through with a restriction
                return reject(new _feathersErrors2.default.NotAuthenticated(error));
              }

              // Attach our decoded token payload to the params
              hook.params.payload = payload;

              resolve(hook);
            });
          })
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
  };
};

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _feathersErrors = require('feathers-errors');

var _feathersErrors2 = _interopRequireDefault(_feathersErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];