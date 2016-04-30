const INCREMENT = 'redux-example/counter/INCREMENT';

const initialState = {
  count: 0
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case INCREMENT:
      return {
        count: state.count + 1
      };
    default:
      return state;
  }
}

export function increment() {
  return {
    type: INCREMENT
  };
}
