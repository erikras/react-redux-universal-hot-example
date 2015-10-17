import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Home,
    Explore,
    Landmark,
    NotFound,
    Snippet
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
      <Route path="/landmark" component={Landmark}/>
      <Route path="/snippet/:key" component={Snippet}/>
      <Route path="/explore" component={Explore}/>
      <Route path="*" component={NotFound}/>
    </Route>
  );
};
