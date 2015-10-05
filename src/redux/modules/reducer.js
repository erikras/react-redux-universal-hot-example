import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerStateReducer } from 'redux-router';

export default combineReducers({
  router: routerStateReducer,
  info,
  widgets
});
