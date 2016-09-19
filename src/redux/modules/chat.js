const ADD_MESSAGE = 'redux-example/chat/ADD_MESSAGE';

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
    default:
      return state;
  }
}

export function addMessage(message) {
  return { type: ADD_MESSAGE, message };
}
