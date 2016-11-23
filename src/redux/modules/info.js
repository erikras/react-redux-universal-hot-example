import { createReducer } from 'redux-blower';

const LOAD = 'redux-example/LOAD';
const LOAD_SUCCESS = 'redux-example/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/LOAD_FAIL';

const initialState = {
  loaded: false
};

const info = createReducer({
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
        data: action.result
      };
    },

    [LOAD_FAIL](state, action) {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    }
  }
});

export default info;

export function isLoaded(globalState) {
  return globalState.info && globalState.info.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/loadInfo')
  };
}
