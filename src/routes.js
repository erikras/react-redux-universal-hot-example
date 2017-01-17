import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { routerActions } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import async from 'async';
import isPromise from 'is-promise';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import { App, Home, NotFound } from 'containers';

// eslint-disable-next-line import/no-dynamic-require
if (typeof System.import === 'undefined') System.import = module => Promise.resolve(require(module));

export default store => {
  const injectReducerAndRender = (name, reducerPromise, containerPromise) =>
    Promise.all([reducerPromise, containerPromise])
      .then(([reducer, container]) => {
        store.inject(name, reducer.default || reducer);
        return container.default || container;
      });

  const onEnterChain = (...listOfOnEnters) => (nextState, replace, onEnterCb) => {
    let redirected = false;
    const wrappedReplace = (...args) => {
      replace(...args);
      redirected = true;
    };
    async.eachSeries(listOfOnEnters, (onEnter, callback) => {
      if (!redirected) {
        const result = onEnter(store, nextState, wrappedReplace);
        if (isPromise(result)) return result.then(() => callback(), callback);
      }
      callback();
    }, err => {
      if (err) onEnterCb(err);
      onEnterCb();
    });
  };

  const loadAuthIfNeeded = () => {
    if (!isAuthLoaded(store.getState())) {
      return store.dispatch(loadAuth()).catch(() => {});
    }
    return Promise.resolve();
  };

  const checkPermissions = chainedPermissions => loadAuthIfNeeded().then(() => chainedPermissions);

  const enterPermissions = (...listOfPermissions) => {
    const permissions = [loadAuthIfNeeded].concat(listOfPermissions.map(perm => perm.onEnter || perm));
    return onEnterChain(...permissions);
  };

  const permissionsComponent = (...listOfPermissions) => ({
    onEnter: enterPermissions(...listOfPermissions),
    getComponent: () => checkPermissions(listOfPermissions.reduceRight(
      (prev, next) => next(prev),
      props => props.children
    ))
  });

  /* Permissions */

  const isAuthenticated = UserAuthWrapper({
    authSelector: state => state.auth.user,
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'UserIsAuthenticated'
  });

  const isNotAuthenticated = UserAuthWrapper({
    authSelector: state => state.auth.user,
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    predicate: user => !user,
    failureRedirectPath: '/',
    allowRedirectBack: false
  });

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      {/* Home (main) route */}
      <IndexRoute component={Home} />

      {/* Routes requiring login */}
      <Route {...permissionsComponent(isAuthenticated)}>
        <Route path="loginSuccess" getComponent={() => System.import('./containers/LoginSuccess/LoginSuccess')} />
        <Route
          path="chatFeathers"
          getComponent={() => injectReducerAndRender(
            'chat', System.import('./redux/modules/chat'),
            System.import('./containers/ChatFeathers/ChatFeathers')
          )}
        />
      </Route>

      {/* Routes disallow login */}
      <Route {...permissionsComponent(isNotAuthenticated)}>
        <Route path="register" getComponent={() => System.import('./containers/Register/Register')} />
      </Route>

      {/* Routes */}
      <Route path="login" getComponent={() => System.import('./containers/Login/Login')} />
      <Route path="about" getComponent={() => System.import('./containers/About/About')} />
      <Route
        path="survey"
        getComponent={() => injectReducerAndRender(
          'survey', System.import('./redux/modules/survey'),
          System.import('./containers/Survey/Survey')
        )}
      />
      <Route
        path="widgets"
        getComponent={() => injectReducerAndRender(
          'widgets', System.import('./redux/modules/widgets'),
          System.import('./containers/Widgets/Widgets')
        )}
      />
      <Route path="chat" getComponent={() => System.import('./containers/Chat/Chat')} />

      {/* Catch all route */}
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
