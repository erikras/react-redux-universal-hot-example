import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import landmark from './landmark';
// import landmarks from './landmarks';
import snippet from './snippet';

export default combineReducers({
  router: routerStateReducer,
  landmark,
  snippet
});
