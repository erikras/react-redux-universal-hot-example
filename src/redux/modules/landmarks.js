import urlHelper from 'helpers/urlHelper';

const LOAD = 'explore-msd/landmarks/LOAD';
const LOAD_SUCCESS = 'explore-msd/landmarks/LOAD_SUCCESS';
const LOAD_FAIL = 'explore-msd/landmarks/LOAD_FAIL';
const LOAD_ALL = 'explore-msd/landmarks/LOAD_ALL';
const LOAD_ALL_SUCCESS = 'explore-msd/landmarks/LOAD_ALL_SUCCESS';
const LOAD_ALL_FAIL = 'explore-msd/landmarks/LOAD_ALL_FAIL';

const initialState = {
  loaded: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        [action.id]: {
          loading: true,
          loaded: false
        }
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        [action.id]: {
          error: null,
          loading: false,
          loaded: true,
          payload: action.result
        }
      };
    case LOAD_FAIL:
      return {
        ...state,
        [action.id]: {
          loading: false,
          loaded: false,
          error: action.error,
          payload: null
        }
      };
    case LOAD_ALL:
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case LOAD_ALL_SUCCESS:
      console.log(action.result);
      return {
        ...state,
        loaded: true,
        loading: false,
      };
    case LOAD_ALL_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export function landmarkIsLoaded(globalState, landmarkId) {
  return globalState.landmarks.hasOwnProperty(landmarkId) && globalState.landmarks[landmarkId].loaded;
}

export function landmarksAreLoaded(globalState) {
  return globalState.landmarks && globalState.landmarks.loaded;
}

export function loadLandmark(id) {
  const url = urlHelper.landmarkEndpoint(id);
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    id: id,
    promise: (client) => client.get(url)
  };
}

export function loadLandmarks() {
  console.log('let\'s load ALL THE LANDMARKS!');
  const url = urlHelper.landmarksEndpoint();
  return {
    types: [LOAD_ALL, LOAD_ALL_SUCCESS, LOAD_ALL_FAIL],
    promise: (client) => client.get(url)
  };
}
