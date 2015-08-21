import {
  WIDGET_LOAD,
  WIDGET_LOAD_SUCCESS,
  WIDGET_LOAD_FAIL,
  WIDGET_EDIT_START,
  WIDGET_EDIT_STOP,
  WIDGET_SAVE,
  WIDGET_SAVE_SUCCESS,
  WIDGET_SAVE_FAIL
} from '../actions/actionTypes';

const initialState = {
  loaded: false,
  editing: {},
  saveError: {}
};

export default function widgets(state = initialState, action = {}) {
  switch (action.type) {
    case WIDGET_LOAD:
      return {
        ...state,
        loading: true
      };
    case WIDGET_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case WIDGET_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    case WIDGET_EDIT_START:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: true
        }
      };
    case WIDGET_EDIT_STOP:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: false
        }
      };
    case WIDGET_SAVE:
      return state; // 'saving' flag handled by redux-form
    case WIDGET_SAVE_SUCCESS:
      const data = [...state.data];
      data[action.result.id - 1] = action.result;
      return {
        ...state,
        data: data,
        editing: {
          ...state.editing,
          [action.id]: false
        },
        saveError: {
          ...state.saveError,
          [action.id]: null
        }
      };
    case WIDGET_SAVE_FAIL:
      return {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: action.error
        }
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.widgets && globalState.widgets.loaded;
}
