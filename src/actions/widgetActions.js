import {
  WIDGET_LOAD,
  WIDGET_LOAD_SUCCESS,
  WIDGET_LOAD_FAIL,
  WIDGET_EDIT_START,
  WIDGET_EDIT_STOP,
  WIDGET_SAVE,
  WIDGET_SAVE_SUCCESS,
  WIDGET_SAVE_FAIL
} from './actionTypes';

export function load() {
  return {
    types: [WIDGET_LOAD, WIDGET_LOAD_SUCCESS, WIDGET_LOAD_FAIL],
    promise: (client) => client.get('/loadWidgets')
  };
}

export function save(widget) {
  return {
    types: [WIDGET_SAVE, WIDGET_SAVE_SUCCESS, WIDGET_SAVE_FAIL],
    id: widget.id,
    promise: (client) => client.post('/updateWidget', {
      data: widget
    })
  };
}

export function editStart(id) {
  return { type: WIDGET_EDIT_START, id };
}

export function editStop(id) {
  return { type: WIDGET_EDIT_STOP, id };
}
