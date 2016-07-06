import {immutable} from 'utils';

const LOAD = 'redux-example/LOAD';
const LOAD_SUCCESS = 'redux-example/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/LOAD_FAIL';

const initialState = immutable({
  loaded: false
});

export default function info(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:

      return state.merge({
        loading: true
      });
    case LOAD_SUCCESS:

      return state.merge({
        loading: false,
        loaded: true,
        data: action.result
      });
    case LOAD_FAIL:

      return state.merge({
        loading: false,
        loaded: false,
        error: action.error
      });
    default:
      return immutable(state);
  }
}

export function isLoaded(globalState) {
  return globalState.info && globalState.info.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/loadInfo')
  };
}
