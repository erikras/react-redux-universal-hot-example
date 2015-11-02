// import request from 'superagent';
import urlHelper from 'helpers/urlHelper';

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

export function landmarkIsLoaded(globalState) {
  return globalState.landmark && globalState.landmark.loaded;
}

export function landmarksAreLoaded(globalState) {
  return globalState.landmarks && globalState.landmarks.loaded;
}

export function loadLandmark() {
  console.log('let\'s load a landmark');
  const url = urlHelper.landmarkEndpoint('1');
  console.log(url);
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(url)
  };
}

export function loadLandmarks() {
  console.log('load ALL the landmarks!');
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(urlHelper.landmarksEndpoint())
  };
}
