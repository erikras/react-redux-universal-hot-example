import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import landmark from './landmark';
// import landmarks from './landmarks';
import snippets from './snippets';

export default combineReducers({
  router: routerStateReducer,
  landmark,
  snippets
});
