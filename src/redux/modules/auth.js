const LOAD = 'redux-example/auth/LOAD';
const LOAD_SUCCESS = 'redux-example/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/auth/LOAD_FAIL';
const LOGIN = 'redux-example/auth/LOGIN';
const LOGIN_SUCCESS = 'redux-example/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'redux-example/auth/LOGIN_FAIL';
const LOGOUT = 'redux-example/auth/LOGOUT';
const LOGOUT_SUCCESS = 'redux-example/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'redux-example/auth/LOGOUT_FAIL';

const VERIFY_LOGIN = 'redux-example/auth/VERIVY_LOGIN';
const VERIFY_LOGIN_SUCCESS = 'redux-example/auth/VERIVY_LOGIN_SUCCESS';
const VERIFY_LOGIN_FAIL = 'redux-example/auth/VERIVY_LOGIN_FAIL';

const REDIRECT_SUCCESS = 'app/auth/REDIRECT_SUCCESS';

const initialState = {
  loaded: false
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
        user: action.result
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
        user: action.result
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
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
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    case REDIRECT_SUCCESS:
      //redirect here
      window.location.replace(action.result)
      return {
        ...state,
        redirectPath: action.result
      }
    default:
      return state;
  }
}

function verifyFromToken(userId, accessToken) {
  return {
    types: [VERIFY_LOGIN, VERIFY_LOGIN_SUCCESS, VERIFY_LOGIN_FAIL],
    promise: ({ oneApiClient }) =>
      oneApiClient.get('/users/loadAuth', {
        params: {
          userId,
          accessToken
        }
      }) //
  };
}

/*
* Actions
* * * * */
export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: ({client}) => client.get('/loadAuth')
  };
}

export function login(name) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: ({client}) => client.post('/login', {
      data: {
        name: name
      }
    })
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: ({client}) => client.get('/logout')
  };
}

export function redirect(path){
  console.log("path:");
  console.log(path);
  return {
    types: ["REDIRECT", REDIRECT_SUCCESS, "REDIRECT_FAIL"],
    promise: ({client}) => client.get('/redirect',{
      params: {
          path: path
      }
    })
  };
}

export function loginFromToken(userId, accessToken) {
  console.log('loginFromToken');
  return dispatch =>
    dispatch(verifyFromToken(userId, accessToken))
      .then(data =>
        dispatch({
          types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
          promise: async ({ }) => {
            try {
              const response = data.accessToken;
              response.user = data;
              console.log(response);

              return data;
            } catch (error) {
              console.log(error);
              // if (strategy === 'local') {
              //   return catchValidation(error);
              // }
              throw error;
            }
          }
        }))
      .then(data => {
        // save into Session
        console.log('save the data');
        console.log(data);
        // console.log(JSON.parse(data));
        return dispatch({
          types: ['LOGIN_SAVE', 'LOGIN_SAVE_SUCCESS', 'LOGIN_SAVE_FAIL'],
          promise: ({ client }) =>
            client.post('/login', {
              data: {
                email: data.email,
                _id: data.id,
                accessToken: {
                  id: data.accessToken.id
                }
              }
            })
        });
      })
      .catch(error => {
        console.log(error);
        // if (strategy === 'local') {
        //   return catchValidation(error);
        // }
        throw error;
      });
}
