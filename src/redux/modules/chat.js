const ADD_MESSAGE = 'redux-example/chat/ADD_MESSAGE';
const CLEAN = 'redux-example/chat/CLEAN';

const initialState = {
  messages: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messages: state.messages.concat(action.message)
      };
    case CLEAN:
      return initialState;
    default:
      return state;
  }
}

export function addMessage(message) {
  return { type: ADD_MESSAGE, message };
}

export function clean() {
  return { type: CLEAN };
}
