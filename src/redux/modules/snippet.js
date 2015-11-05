import urlHelper from 'helpers/urlHelper';

const LOAD = 'explore-msd/snippet/LOAD';
const LOAD_SUCCESS = 'explore-msd/snippet/LOAD_SUCCESS';
const LOAD_FAIL = 'explore-msd/snippet/LOAD_FAIL';

const initialState = {
  data: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        data: {
          ...state.data,
          [action.id]: {
            loading: true,
            loaded: false
          }
        }
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          [action.id]: {
            error: null,
            loading: false,
            loaded: true,
            ...action.result
          }
        }
      };
    case LOAD_FAIL:
      return {
        ...state,
        data: {
          ...state.data,
          [action.id]: {
            loading: false,
            loaded: false,
            error: action.error
          }
        }
      };
    default:
      return state;
  }
}

export function snippetIsLoaded(globalState, snippetId) {
  return snippetId in globalState.snippet.data;
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
