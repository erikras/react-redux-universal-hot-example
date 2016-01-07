import urlHelper from 'helpers/urlHelper';

const LOAD = 'explore-msd/globalSearch/LOAD';
const LOAD_SUCCESS = 'explore-msd/globalSearch/LOAD_SUCCESS';
const LOAD_FAIL = 'explore-msd/globalSearch/LOAD_FAIL';
const CLEAR = 'explore-msd/globalSearch/CLEAR';

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
    case CLEAR:
      return {
        ...state,
        loading: null,
        loaded: null,
        error: null,
        query: null,
        results: null
      };
    default:
      return state;
  }
}

export function searchIsDone(globalState, query) {
  return ((globalState.globalSearch.query === query) && globalState.globalSearch.loaded);
}

export function clearSearch() {
  return {
    type: CLEAR
  };
}

export function doSearch(query) {
  console.log('query length:', query.length);
  if (query.length < 1) return clearSearch();
  console.log('doing search: ');
  const url = urlHelper.globalSearchEndpoint(query);
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    query: query,
    promise: (client) => client.get(url)
  };
}
