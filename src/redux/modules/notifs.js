const NOTIF_SEND = 'redux-example/notifs/NOTIF_SEND';
const NOTIF_DISMISS = 'redux-example/notifs/NOTIF_DISMISS';
const NOTIF_CLEAR = 'redux-example/notifs/NOTIF_CLEAR';
const NOTIF_CLEAR_ALL = 'redux-example/notifs/NOTIF_CLEAR_ALL';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case NOTIF_SEND:
      return { ...state, [action.namespace]: [action.payload, ...state[action.namespace] || []] };
    case NOTIF_DISMISS:
      return {
        ...state,
        [action.namespace]: (state[action.namespace] || []).filter(notif =>
          notif.id !== action.payload
        )
      };
    case NOTIF_CLEAR:
      return { ...state, [action.namespace]: [] };
    case NOTIF_CLEAR_ALL:
      return {};
    default:
      return state;
  }
}

export function notifSend(notif, namespace = 'global') {
  if (!notif.id) {
    notif.id = new Date().getTime() * Math.random();
  }
  return dispatch => {
    dispatch({ type: NOTIF_SEND, namespace, payload: notif });

    if (notif.dismissAfter) {
      setTimeout(() => dispatch({ type: NOTIF_DISMISS, namespace, payload: notif.id }), notif.dismissAfter);
    }
  };
}

export function notifDismiss(id, namespace = 'global') {
  return { type: NOTIF_DISMISS, namespace, payload: id };
}

export function notifClear(namespace = 'global') {
  return { type: NOTIF_CLEAR, namespace };
}

export function notifClearAll() {
  return { type: NOTIF_CLEAR_ALL };
}
