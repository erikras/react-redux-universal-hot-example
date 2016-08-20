import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { reducer as form } from 'redux-form';
import auth from './modules/auth';
import notifs from './modules/notifs';
import counter from './modules/counter';
import info from './modules/info';
import widgets from './modules/widgets';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  form,
  notifs,
  auth,
  counter: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  }),
  info,
  widgets
});
