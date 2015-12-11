import urlHelper from 'helpers/urlHelper';

const LOAD = 'explore-msd/categorySnippets/LOAD';
const LOAD_SUCCESS = 'explore-msd/categorySnippets/LOAD_SUCCESS';
const LOAD_FAIL = 'explore-msd/categorySnippets/LOAD_FAIL';

const initialState = {
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
    default:
      return state;
  }
}

export function snippetsAreLoaded(globalState, snippetId) {
  return globalState.categorySnippets.hasOwnProperty(snippetId) && globalState.categorySnippets[snippetId].loaded;
}

export function loadSnippets(id) {
  const url = urlHelper.categorySnippetsEndpoint(id);
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    id: id,
    promise: (client) => client.get(url)
  };
}
