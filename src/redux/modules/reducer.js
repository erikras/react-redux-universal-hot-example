import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import areas from './areas';
import landmarks from './landmarks';
import landmarksSearch from './landmarksSearch';
import snippets from './snippets';

export default combineReducers({
  areas,
  landmarks,
  landmarksSearch,
  router: routerStateReducer,
  snippets
});
