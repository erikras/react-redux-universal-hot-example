import {
  FORM_CHANGE
} from '../actions/actionTypes';

export default function createFormReducer(name, validate, initialData = {}) {
  return (state = {data: initialData, errors: {}}, action = {}) => {
    switch (action.type) {
      case FORM_CHANGE:
        if (action.form === name) {
          const data = {
            ...state.data,
            [action.field]: action.value
          };
          console.info('data', data);
          return {
            ...state,
            data: data,
            errors: validate(data)
          };
        }
    }
    return state;
  };
}
