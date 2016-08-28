import app, { restApp, socket } from 'app';
import cookie from 'js-cookie';

const LOAD = 'redux-example/auth/LOAD';
const LOAD_SUCCESS = 'redux-example/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/auth/LOAD_FAIL';
const LOGIN = 'redux-example/auth/LOGIN';
const LOGIN_SUCCESS = 'redux-example/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'redux-example/auth/LOGIN_FAIL';
const REGISTER = 'redux-example/auth/REGISTER';
const REGISTER_SUCCESS = 'redux-example/auth/REGISTER_SUCCESS';
const REGISTER_FAIL = 'redux-example/auth/REGISTER_FAIL';
const LOGOUT = 'redux-example/auth/LOGOUT';
const LOGOUT_SUCCESS = 'redux-example/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'redux-example/auth/LOGOUT_FAIL';
const SYNC_SOCKET = 'redux-example/auth/SYNC_SOCKET';
const SYNC_SOCKET_SUCCESS = 'redux-example/auth/SYNC_SOCKET_SUCCESS';
const SYNC_SOCKET_FAIL = 'redux-example/auth/SYNC_SOCKET_FAIL';

const userService = app.service('users');

const initialState = {
  loaded: false,
  socketSynced: false
};

const catchValidation = error => {
  if (error.message) {
    if (error.message === 'Validation failed' && error.data) {
      return Promise.reject(error.data);
    }
    return Promise.reject({ _error: error.message });
  }
  return Promise.reject(error);
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        token: action.result.token,
        user: action.result.user
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        token: action.result.token,
        user: action.result.user
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        token: null,
        loginError: action.error
      };
    case REGISTER:
      return {
        ...state,
        registeringIn: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registeringIn: false
      };
    case REGISTER_FAIL:
      return {
        ...state,
        registeringIn: false,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null,
        token: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    case SYNC_SOCKET:
      return {
        ...state,
        socketSyncing: true
      };
    case SYNC_SOCKET_SUCCESS:
      return {
        ...state,
        socketSyncing: false,
        socketSynced: true
      };
    case SYNC_SOCKET_FAIL:
      return {
        ...state,
        socketSyncing: false,
        socketSyncError: action.error
      };
    default:
      return state;
  }
}

function shareFeathersAuth(response) {
  const { token = undefined, user = undefined } = response;
  const storage = app.get('storage');
  if (token) {
    storage.setItem('feathers-jwt', token);
  } else {
    storage.removeItem('feathers-jwt');
  }

  app.set('token', token); // -> set manually the JWT
  app.set('user', user); // -> set manually the user
  restApp.set('token', token);
  restApp.set('user', user);

  console.log(app.get('token')); // -> the JWT
  console.log(app.get('user')); // -> the user

  return response;
}

function setCookie(result) {
  if (result.expires) {
    cookie.set('feathers-session', app.get('token'), { expires: result.expires / (60 * 60 * 24 * 1000) });
  }
  return result;
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function isSocketSynced(globalState) {
  return globalState.auth && globalState.auth.socketSynced;
}

export function socketSyncing(globalState) {
  return globalState.auth && globalState.auth.socketSyncing;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get('/auth/load')
  };
}

export function syncSocket() {
  return {
    types: [SYNC_SOCKET, SYNC_SOCKET_SUCCESS, SYNC_SOCKET_FAIL],
    promise: () => new Promise(resolve => {
      const socketId = socket.io.engine.id;
      if (socketId) {
        return resolve(restApp.service('/auth/sync').create({ socketId }));
      }
      socket.on('connect', () => {
        resolve(restApp.service('/auth/sync').create({ socketId: socket.io.engine.id }));
      });
    })
  };
}

export function register(data) {
  return {
    types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
    promise: () => userService.create(data).catch(catchValidation)
  };
}

export function login(data) {
  const socketId = socket.io.engine.id;
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: () => app.authenticate({
      type: 'local',
      email: data.email,
      password: data.password,
      socketId
    })
      .then(shareFeathersAuth)
      .then(setCookie)
      .catch(catchValidation)
  };
}

export function oauthLogin(provider, data) {
  const socketId = socket.io.engine.id;
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: () => restApp.service(`/auth/${provider}`)
      .create({ ...data, socketId })
      .then(shareFeathersAuth)
      .then(setCookie)
      .catch(catchValidation)
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: () => app.logout()
      .then(() => {
        cookie.set('feathers-session', '', { expires: -1 });
      })
  };
}
