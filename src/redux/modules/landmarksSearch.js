import urlHelper from 'helpers/urlHelper';

const LOAD = 'explore-msd/landmarksSearch/LOAD';
const LOAD_SUCCESS = 'explore-msd/landmarksSearch/LOAD_SUCCESS';
const LOAD_FAIL = 'explore-msd/landmarksSearch/LOAD_FAIL';

const initialState = {
  query: null,
  results: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        query: action.query,
        loading: true,
        loaded: false
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        loaded: true,
        query: action.query,
        results: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
        query: action.query,
        results: null
      };
    default:
      return state;
  }
}

export function searchIsDone(globalState, query) {
  return ((globalState.landmarksSearch.query === query) && globalState.landmarksSearch.loaded);
}

export function doSearch(query) {
  const url = urlHelper.landmarksSearchEndpoint(query);
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    query: query,
    promise: (client) => client.get(url)
  };
}
