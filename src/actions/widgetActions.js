import {
  WIDGET_LOAD,
  WIDGET_LOAD_SUCCESS,
  WIDGET_LOAD_FAIL
} from './actionTypes';

export function load() {
  return {
    types: [WIDGET_LOAD, WIDGET_LOAD_SUCCESS, WIDGET_LOAD_FAIL],
    promise: (client) => client.get('/loadWidgets')
  };
}
