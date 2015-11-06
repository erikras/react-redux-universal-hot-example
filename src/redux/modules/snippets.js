import urlHelper from 'helpers/urlHelper';

const LOAD = 'explore-msd/snippets/LOAD';
const LOAD_SUCCESS = 'explore-msd/snippets/LOAD_SUCCESS';
const LOAD_FAIL = 'explore-msd/snippets/LOAD_FAIL';

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

export function snippetIsLoaded(globalState, snippetId) {
  return globalState.snippets.hasOwnProperty(snippetId) && globalState.snippets[snippetId].loaded;
}

export function loadSnippet(id) {
  console.log('let\'s load snippet ', id);
  const url = urlHelper.snippetEndpoint(id);
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    id: id,
    promise: (client) => client.get(url)
  };
}
