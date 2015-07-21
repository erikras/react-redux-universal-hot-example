import {
  COUNTER_INCREMENT
} from '../actions/actionTypes';

const initialState = {
  count: 0
};

export default function counter(state = initialState, action = {}) {
  switch (action.type) {
    case COUNTER_INCREMENT:
      let {count} = state;
      return {
        count: count + 1
      };
    default:
      return state;
  }
}
