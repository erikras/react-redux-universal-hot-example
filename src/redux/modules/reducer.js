import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import landmark from './landmark';
// import landmarks from './landmarks';

export default combineReducers({
  router: routerStateReducer,
  landmark
});
