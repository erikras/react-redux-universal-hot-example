const IS_VALID = 'redux-example/survey/IS_VALID';
const IS_VALID_SUCCESS = 'redux-example/survey/IS_VALID_SUCCESS';
const IS_VALID_FAIL = 'redux-example/survey/IS_VALID_FAIL';

const initialState = {
  saveError: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case IS_VALID:
      return state; // 'saving' flag handled by redux-form
    case IS_VALID_SUCCESS:
      const data = [...state.data];
      data[action.result.id - 1] = action.result;
      return {
        ...state,
        data: data,
        saveError: null,
      };
    case IS_VALID_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: action.error
      } : state;
    default:
      return state;
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
