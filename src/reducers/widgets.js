import {
  WIDGET_LOAD,
  WIDGET_LOAD_SUCCESS,
  WIDGET_LOAD_FAIL
} from '../actions/actionTypes';

const initialState = {
  loaded: false
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
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.widgets && globalState.widgets.loaded;
}
