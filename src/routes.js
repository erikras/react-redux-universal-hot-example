import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
// import {Login} from 'containers';
export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/');
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
  if (typeof require.ensure !== 'function') require.ensure = (deps, cb) => cb(require);

  return {
    path: '/',
    component: require('./containers/App/App'),
    indexRoute: {
      component: require('./containers/Home/Home')
    },
    childRoutes: [{
      path: 'login',
      getComponent(nextState, cb) {
        console.time('gettingComponent');
        store.dispatch({
          type: 'WEBPACK_LOAD'
        });
        require.ensure([], (require) => {
          cb(null, require('./containers/Login/Login'));
          store.dispatch({
            type: 'WEBPACK_LOAD_END'
          });
          console.timeEnd('gettingComponent');
        });
      }

    }, {
      path: 'about',
      getComponent(nextState, cb) {
        console.time('gettingComponent');
        store.dispatch({
          type: 'WEBPACK_LOAD'
        });
        require.ensure([], (require) => {
          cb(null, require('./containers/About/About'));
          store.dispatch({
            type: 'WEBPACK_LOAD_END'
          });
          console.timeEnd('gettingComponent');
        });
      }

    }, {
      path: 'survey',
      getComponent(nextState, cb) {
        require.ensure([], (require) =>
          cb(null, require('./containers/Survey/Survey')));
      }
    }, {
      path: 'widgets',
      getComponent(nextState, cb) {
        store.dispatch({
          type: 'WEBPACK_LOAD'
        });
        require.ensure([], (require) => {
          cb(null, require('./containers/Widgets/Widgets'));
          store.dispatch({
            type: 'WEBPACK_LOAD_END'
          });
        });
      }
    }, {
      onEnter: requireLogin,
      childRoutes: [
        {
          path: 'chat',
          getComponent(nextState, cb) {
            require.ensure([], (require) =>
              cb(null, require('./containers/Chat/Chat')));
          }
        },
        {
          path: 'loginSuccess',
          getComponent(nextState, cb) {
            require.ensure([], (require) =>
              cb(null, require('./containers/LoginSuccess/LoginSuccess')));
          }
        }
      ]
    }, {
      path: '*',
      getComponent(nextState, cb) {
        require.ensure([], (require) =>
          cb(null, require('./containers/NotFound/NotFound')));
      }
    }]
  };
};
