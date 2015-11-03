import urlHelper from 'helpers/urlHelper';

const LOAD = 'explore-msd/snippet/LOAD';
const LOAD_SUCCESS = 'explore-msd/snippet/LOAD_SUCCESS';
const LOAD_FAIL = 'explore-msd/snippet/LOAD_FAIL';

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
  return globalState.snippet && globalState.snippet.loaded;
}

export function loadSnippet(id) {
  console.log('let\'s load a snippet');
  const url = urlHelper.snippetEndpoint(id);
  console.log(url);
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(url)
  };
}
