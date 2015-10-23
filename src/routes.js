import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {
    App,
    Home,
    Explore,
    Landmark,
    NotFound
  } from 'containers';
import { Snippet } from 'components';


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
    <Route path="/" component={App} history={history}>
      <IndexRoute component={Home} />
      <Route path="/landmark" component={Landmark} />
      <Route path="/snippet/:slug" component={Snippet} />
      <Route path="/explore" component={Explore} />
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
