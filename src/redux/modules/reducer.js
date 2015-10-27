import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import landmarks from './landmarks';

export default combineReducers({
  router: routerStateReducer,
  landmarks
});
