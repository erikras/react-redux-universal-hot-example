import app, { restApp, socket } from 'app';
import { SubmissionError } from 'redux-form';
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
const OAUTHLOGIN = 'redux-example/auth/OAUTHLOGIN';
const OAUTHLOGIN_SUCCESS = 'redux-example/auth/OAUTHLOGIN_SUCCESS';
const OAUTHLOGIN_FAIL = 'redux-example/auth/OAUTHLOGIN_FAIL';
const LOGOUT = 'redux-example/auth/LOGOUT';
const LOGOUT_SUCCESS = 'redux-example/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'redux-example/auth/LOGOUT_FAIL';

const userService = restApp.service('users');

const initialState = {
  loaded: false
};

const catchValidation = error => {
  if (error.message) {
    if (error.message === 'Validation failed' && error.data) {
      throw new SubmissionError(error.data);
    }
    throw new SubmissionError({ _error: error.message });
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
    case OAUTHLOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
    case OAUTHLOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        token: action.result.token,
        user: action.result.user
      };
    case LOGIN_FAIL:
    case OAUTHLOGIN_FAIL:
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
        registerError: action.error
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
    default:
      return state;
  }
}

function saveAuth(response) {
  const { token, user } = response;
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
  const options = result.expires ? { expires: result.expires / (60 * 60 * 24 * 1000) } : undefined;
  cookie.set('feathers-session', app.get('token'), options);
  return result;
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get('/auth/load')
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
    promise: () => restApp.authenticate({
      type: 'local',
      email: data.email,
      password: data.password,
      socketId
    })
      .then(saveAuth)
      .then(setCookie)
      .catch(catchValidation)
  };
}

export function oauthLogin(provider, data, validation = false) {
  const socketId = socket.io.engine.id;
  return {
    types: [OAUTHLOGIN, OAUTHLOGIN_SUCCESS, OAUTHLOGIN_FAIL],
    promise: () => restApp.service(`/auth/${provider}`)
      .create({ ...data, socketId })
      .then(saveAuth)
      .then(setCookie)
      .catch(validation ? catchValidation : error => Promise.reject(error))
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: () => (socket.connected ? app : restApp).logout().then(() => {
      cookie.set('feathers-session', '', { expires: -1 });
    })
  };
}
