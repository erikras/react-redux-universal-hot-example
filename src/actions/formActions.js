import {
  FORM_CHANGE
} from './actionTypes';

export function formChange(form, field, value) {
  return {
    type: FORM_CHANGE,
    form: form,
    field: field,
    value: value
  };
}
