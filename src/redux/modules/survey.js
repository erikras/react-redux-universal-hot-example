import {immutable} from 'utils';
const IS_VALID = 'redux-example/survey/IS_VALID';
const IS_VALID_SUCCESS = 'redux-example/survey/IS_VALID_SUCCESS';
const IS_VALID_FAIL = 'redux-example/survey/IS_VALID_FAIL';

const initialState = immutable({
  saveError: null,
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case IS_VALID:
      return immutable(state); // 'saving' flag handled by redux-form
    case IS_VALID_SUCCESS:
      const data = [...state.data];
      data[action.result.id - 1] = action.result;

      return state.merge({
        data: data,
        saveError: null,
      });
    case IS_VALID_FAIL:
      return state.merge(typeof action.error === 'string' ? {
        saveError: action.error
      } : {});
    default:
      return immutable(state);
  }
}

export function isValidEmail(data) {
  return {
    types: [IS_VALID, IS_VALID_SUCCESS, IS_VALID_FAIL],
    promise: (client) => client.post('/survey/isValid', {
      data
    })
  };
}
