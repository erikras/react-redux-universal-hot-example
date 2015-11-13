import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import areas from './areas';
import landmarks from './landmarks';
import snippets from './snippets';

export default combineReducers({
  areas,
  landmarks,
  router: routerStateReducer,
  snippets
});
