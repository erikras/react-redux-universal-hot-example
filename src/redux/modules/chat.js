const LOAD = 'redux-example/chat/LOAD';
const LOAD_SUCCESS = 'redux-example/chat/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/chat/LOAD_FAIL';
const ADD_MESSAGE = 'redux-example/chat/ADD_MESSAGE';

const initialState = {
  loaded: false,
  messages: []
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
        messages: action.result.data
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: state.messages.concat(action.message)
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.chat && globalState.chat.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: ({ app }) => app.service('messages').find({
      query: {
        $sort: { createdAt: -1 },
        $limit: 25
      }
    }).then(page => ({ ...page, data: page.data.reverse() }))
  };
}

export function addMessage(message) {
  return { type: ADD_MESSAGE, message };
}
