import urlHelper from 'helpers/urlHelper';

const LOAD = 'explore-msd/areas/LOAD';
const LOAD_SUCCESS = 'explore-msd/areas/LOAD_SUCCESS';
const LOAD_FAIL = 'explore-msd/areas/LOAD_FAIL';
const LOAD_ALL = 'explore-msd/areas/LOAD_ALL';
const LOAD_ALL_SUCCESS = 'explore-msd/areas/LOAD_ALL_SUCCESS';
const LOAD_ALL_FAIL = 'explore-msd/areas/LOAD_ALL_FAIL';

const initialState = {
  ALL: {
    loaded: false
  }
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
        ALL: {
          loaded: false,
          loading: true
        }
      };
    case LOAD_ALL_SUCCESS:
      const areas = {};
      for (const area of action.result) {
        areas[area.id] = {
          error: null,
          loaded: false,
          loading: false,
          payload: area
        };
      }
      return {
        ...state,
        ALL: {
          loaded: true,
          loading: false,
          payload: action.result
        },
        ...areas
      };
    case LOAD_ALL_FAIL:
      return {
        ...state,
        ALL: {
          loading: false,
          loaded: false,
          error: action.error,
          payload: null
        }
      };
    default:
      return state;
  }
}

export function areaIsLoaded(globalState, areaId) {
  return globalState.areas.hasOwnProperty(areaId) && globalState.areas[areaId].loaded;
}

export function areasAreLoaded(globalState) {
  return globalState.areas.ALL && globalState.areas.ALL.loaded;
}

export function loadArea(id) {
  const url = urlHelper.areaEndpoint(id);
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    id: id,
    promise: (client) => client.get(url)
  };
}

export function loadAreas() {
  const url = urlHelper.areasEndpoint();
  return {
    types: [LOAD_ALL, LOAD_ALL_SUCCESS, LOAD_ALL_FAIL],
    promise: (client) => client.get(url)
  };
}
