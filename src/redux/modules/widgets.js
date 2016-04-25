import { createReducer } from 'redux-blower';

const LOAD = 'redux-example/widgets/LOAD';
const LOAD_SUCCESS = 'redux-example/widgets/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/widgets/LOAD_FAIL';
const EDIT_START = 'redux-example/widgets/EDIT_START';
const EDIT_STOP = 'redux-example/widgets/EDIT_STOP';
const SAVE = 'redux-example/widgets/SAVE';
const SAVE_SUCCESS = 'redux-example/widgets/SAVE_SUCCESS';
const SAVE_FAIL = 'redux-example/widgets/SAVE_FAIL';

const initialState = {
  loaded: false,
  editing: {},
  saveError: {}
};

const reducer = createReducer({
  initialState,

  listenTo: {
    [LOAD](state) {
      return {
        ...state,
        loading: true
      };
    },

    [LOAD_SUCCESS](state, action) {
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    },

    [LOAD_FAIL](state, action) {
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    },

    [EDIT_START](state, action) {
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: true
        }
      };
    },

    [EDIT_STOP](state, action) {
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: false
        }
      };
    },

    [SAVE](state) {
      return state; // 'saving' flag handled by redux-form
    },

    [SAVE_SUCCESS](state, action) {
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
    },

    [SAVE_FAIL](state, action) {
      return typeof action.error === 'string' ? {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: action.error
        }
      } : state;
    }
  }
});

export default reducer;

export function isLoaded(globalState) {
  return globalState.widgets && globalState.widgets.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/widget/load/param1/param2') // params not used, just shown as demonstration
  };
}

export function save(widget) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: widget.id,
    promise: (client) => client.post('/widget/update', {
      data: widget
    })
  };
}

export function editStart(id) {
  return { type: EDIT_START, id };
}

export function editStop(id) {
  return { type: EDIT_STOP, id };
}
