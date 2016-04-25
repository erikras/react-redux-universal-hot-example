import { createReducer } from 'redux-blower';

const LOAD = 'redux-example/auth/LOAD';
const LOAD_SUCCESS = 'redux-example/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/auth/LOAD_FAIL';
const LOGIN = 'redux-example/auth/LOGIN';
const LOGIN_SUCCESS = 'redux-example/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'redux-example/auth/LOGIN_FAIL';
const LOGOUT = 'redux-example/auth/LOGOUT';
const LOGOUT_SUCCESS = 'redux-example/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'redux-example/auth/LOGOUT_FAIL';

const initialState = {
  loaded: false
};

const reducer = createReducer({
  initialState,

  listenTo: {
    [LOAD](state) {
      return {
        ...state,
        loading: true
      };
    },

    [LOAD_SUCCESS](state, action) {
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    },

    [LOAD_FAIL](state, action) {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    },

    [LOGIN](state) {
      return {
        ...state,
        loggingIn: true
      };
    },

    [LOGIN_SUCCESS](state, action) {
      return {
        ...state,
        loggingIn: false,
        user: action.result
      };
    },

    [LOGIN_FAIL](state, action) {
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    },

    [LOGOUT](state) {
      return {
        ...state,
        loggingOut: true
      };
    },

    [LOGOUT_SUCCESS](state) {
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    },

    [LOGOUT_FAIL](state, action) {
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    }
  }
});

export default reducer;

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/loadAuth')
  };
}

export function login(name) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/login', {
      data: {
        name: name
      }
    })
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/logout')
  };
}
