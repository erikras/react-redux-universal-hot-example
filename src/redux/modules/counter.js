import { createReducer } from 'redux-blower';

const INCREMENT = 'redux-example/counter/INCREMENT';

const initialState = {
  count: 0
};

const reducer = createReducer({
  initialState,

  listenTo: {
    [INCREMENT]() {
      const { count } = this.state;

      return {
        count: count + 1
      };
    }
  }
});

export default reducer;

export function increment() {
  return {
    type: INCREMENT
  };
}
