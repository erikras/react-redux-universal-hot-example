import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Chat,
    Home,
    Login,
    LoginSuccess,
    Survey,
    Explore,
    Landmark,
    NotFound,
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replaceState, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replaceState(null, '/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route component={App} history={history}>
      <Route path="/" component={Home}/>
      <Route path="/login" component={Login}/>
      <Route component={RequireLogin}>
        <Route path="/chat" component={Chat}/>
        <Route path="/loginSuccess" component={LoginSuccess}/>
      </Route>
      <Route path="/survey" component={Survey}/>
      <Route path="/landmark" component={Landmark}/>
      <Route path="/explore" component={Explore}/>
      <Route path="*" component={NotFound}/>
    </Route>
  );
};
