import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
  App, Chat, ChatFeathers, Home, Widgets, About,
  Register, Login, LoginSuccess, Survey, NotFound
} from 'containers';

export default store => {
  const loadAuthIfNeeded = cb => {
    if (!isAuthLoaded(store.getState())) {
      return store.dispatch(loadAuth()).then(() => cb());
    }
    return cb();
  };
  const checkUser = (cond, replace, cb) => {
    const { auth: { user } } = store.getState();
    if (!cond(user)) replace('/');
    cb();
  };

  const requireNotLogged = (nextState, replace, cb) => {
    const cond = user => !user;
    loadAuthIfNeeded(() => checkUser(cond, replace, cb));
  };
  const requireLogin = (nextState, replace, cb) => {
    const cond = user => !!user;
    loadAuthIfNeeded(() => checkUser(cond, replace, cb));
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      {/* Home (main) route */}
      <IndexRoute component={Home} />

      {/* Routes requiring login */}
      <Route onEnter={requireLogin}>
        <Route path="loginSuccess" component={LoginSuccess} />
        <Route path="chatFeathers" component={ChatFeathers} />
      </Route>

      {/* Routes disallow login */}
      <Route onEnter={requireNotLogged}>
        <Route path="register" component={Register} />
      </Route>

      {/* Routes */}
      <Route path="login" component={Login} />
      <Route path="about" component={About} />
      <Route path="survey" component={Survey} />
      <Route path="widgets" component={Widgets} />
      <Route path="chat" component={Chat} />

      {/* Catch all route */}
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
