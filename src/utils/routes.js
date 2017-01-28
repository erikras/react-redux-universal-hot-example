import async from 'async';
import isPromise from 'is-promise';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';

export default function getRoutesUtils(store) {
  function injectReducerAndRender(reducerPromises, containerPromise) {
    const reducerNames = Object.keys(reducerPromises);
    return Promise.all(Object.values(reducerPromises))
      .then(reducers => {
        reducers.map((reducer, i) => store.inject(reducerNames[i], reducer.default || reducer));
        if (!isPromise(containerPromise) && typeof containerPromise === 'object') {
          const containerNames = Object.keys(containerPromise);
          return Promise.all(Object.values(containerPromise))
            .then(containers => containers.reduce((prev, next, i) => ({
              ...prev,
              [containerNames[i]]: next.default || next
            }), {}));
        }
        return containerPromise;
      });
  }

  function onEnterChain(...listOfOnEnters) {
    return (nextState, replace, onEnterCb) => {
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
  }

  function loadAuthIfNeeded() {
    if (!isAuthLoaded(store.getState())) {
      return store.dispatch(loadAuth()).catch(() => {});
    }
    return Promise.resolve();
  }

  function checkPermissions(chainedPermissions) {
    return loadAuthIfNeeded().then(() => chainedPermissions);
  }

  function enterPermissions(...listOfPermissions) {
    const permissions = [loadAuthIfNeeded].concat(listOfPermissions.map(perm => perm.onEnter || perm));
    return onEnterChain(...permissions);
  }

  function permissionsComponent(...listOfPermissions) {
    return (component = props => props.children) => ({
      onEnter: enterPermissions(...listOfPermissions),
      getComponent: () => checkPermissions(listOfPermissions.reduceRight(
        (prev, next) => next(prev),
        component
      ))
    });
  }

  return {
    injectReducerAndRender,
    permissionsComponent
  };
}
