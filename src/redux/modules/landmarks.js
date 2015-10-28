const LOAD = 'explore-msd/landmarks/LOAD';
const LOAD_SUCCESS = 'explore-msd/landmarks/LOAD_SUCCESS';
const LOAD_FAIL = 'explore-msd/landmarks/LOAD_FAIL';

const initialState = {
  loaded: false,
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
        data: action.result,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.landmarks && globalState.landmarks.loaded;
}

export function load() {
  console.log('it\'s api call time!');
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/landmarks/load')
  };
}
