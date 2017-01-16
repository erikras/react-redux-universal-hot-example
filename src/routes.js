import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import { App, Home, NotFound } from 'containers';

// eslint-disable-next-line import/no-dynamic-require
if (typeof System.import === 'undefined') System.import = module => Promise.resolve(require(module));

export default store => {
  const loadAuthIfNeeded = cb => {
    if (!isAuthLoaded(store.getState())) {
      return store.dispatch(loadAuth()).then(() => cb()).catch(cb);
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

  const injectAndRender = (name, reducerPromise, containerPromise) =>
    Promise.all([reducerPromise, containerPromise])
      .then(([reducer, container]) => {
        store.inject(name, reducer.default || reducer);
        return container.default || container;
      });

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      {/* Home (main) route */}
      <IndexRoute component={Home} />

      {/* Routes requiring login */}
      <Route onEnter={requireLogin}>
        <Route path="loginSuccess" getComponent={() => System.import('./containers/LoginSuccess/LoginSuccess')} />
        <Route
          path="chatFeathers"
          getComponent={() => injectAndRender(
            'chat',
            System.import('./redux/modules/chat'),
            System.import('./containers/ChatFeathers/ChatFeathers')
          )} />
      </Route>

      {/* Routes disallow login */}
      <Route onEnter={requireNotLogged}>
        <Route path="register" getComponent={() => System.import('./containers/Register/Register')} />
      </Route>

      {/* Routes */}
      <Route path="login" getComponent={() => System.import('./containers/Login/Login')} />
      <Route path="about" getComponent={() => System.import('./containers/About/About')} />
      <Route
        path="survey"
        getComponent={() => injectAndRender(
          'survey',
          System.import('./redux/modules/survey'),
          System.import('./containers/Survey/Survey')
        )} />
      <Route
        path="widgets"
        getComponent={() => injectAndRender(
          'widgets',
          System.import('./redux/modules/widgets'),
          System.import('./containers/Widgets/Widgets')
        )} />
      <Route path="chat" getComponent={() => System.import('./containers/Chat/Chat')} />

      {/* Catch all route */}
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
