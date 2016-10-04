'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connected = connected;
exports.authenticateSocket = authenticateSocket;
exports.logoutSocket = logoutSocket;
exports.getCookie = getCookie;
exports.clearCookie = clearCookie;
exports.getJWT = getJWT;
exports.getStorage = getStorage;
// Returns a promise that resolves when the socket is connected
function connected(app) {
  return new Promise(function (resolve, reject) {
    if (app.rest) {
      return resolve();
    }

    var socket = app.io || app.primus;

    if (!socket) {
      return reject(new Error('It looks like no client connection has been configured.'));
    }

    // If one of those events happens before `connect` the promise will be rejected
    // If it happens after, it will do nothing (since Promises can only resolve once)
    socket.once('disconnect', reject);
    socket.once('close', reject);

    // If the socket is not connected yet we have to wait for the `connect` event
    if (app.io && !socket.connected || app.primus && socket.readyState !== 3) {
      var connectEvent = app.primus ? 'open' : 'connect';
      socket.once(connectEvent, function () {
        return resolve(socket);
      });
    } else {
      resolve(socket);
    }
  });
}

// Returns a promise that authenticates a socket
function authenticateSocket(options, socket, method) {
  return new Promise(function (resolve, reject) {
    socket.once('unauthorized', reject);
    socket.once('authenticated', resolve);

    socket[method]('authenticate', options);
  });
}

// Returns a promise that de-authenticates a socket
function logoutSocket(socket, method) {
  return new Promise(function (resolve, reject) {
    socket[method]('logout', function (error) {
      if (error) {
        reject(error);
      }

      resolve();
    });
  });
}

// Returns the value for a cookie
function getCookie(name) {
  if (typeof document !== 'undefined') {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');

    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  }

  return null;
}

// Returns the value for a cookie
function clearCookie(name) {
  if (typeof document !== 'undefined') {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  return null;
}

// Tries the JWT from the given key either from a storage or the cookie
function getJWT(tokenKey, cookieKey, storage) {
  return Promise.resolve(storage.getItem(tokenKey)).then(function (jwt) {
    var cookieToken = getCookie(cookieKey);

    if (cookieToken) {
      return cookieToken;
    }

    return jwt;
  });
}

// Returns a storage implementation
function getStorage(storage) {
  if (storage) {
    return storage;
  }

  return {
    store: {},
    getItem: function getItem(key) {
      return this.store[key];
    },
    setItem: function setItem(key, value) {
      return this.store[key] = value;
    },
    removeItem: function removeItem(key) {
      delete this.store[key];
      return this;
    }
  };
}