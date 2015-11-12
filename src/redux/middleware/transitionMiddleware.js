import {ROUTER_DID_CHANGE} from 'redux-router/lib/constants';
import {getPrefetchedData, getDeferredData} from 'react-fetcher';

const locationsAreEqual = (locA, locB) => (locA.pathname === locB.pathname) && (locA.search === locB.search);

export default ({getState, dispatch}) => next => action => {
  if (action.type === ROUTER_DID_CHANGE) {
    if (getState().router && locationsAreEqual(action.payload.location, getState().router.location)) {
      return next(action);
    }

    const {components, location, params} = action.payload;
    const locals = {getState, dispatch, location, params};
    const promise = new Promise((resolve) => {

      const doTransition = () => {
        next(action);
        getDeferredData(components, locals)
          .then(resolve)
          .catch(error => {
            // TODO: You may want to handle errors for @defer here
            console.warn('Warning: Error in "defer" decorator function', error);
            return resolve();
          });
      };

      getPrefetchedData(components, locals)
        .then(doTransition)
        .catch(error => {
          // TODO: You may want to handle errors for @prefetch here
          console.warn('Warning: Error in "prefetch" decorator function', error);
          return doTransition();
        });
    });

    if (__SERVER__) {
      // router state is null until ReduxRouter is created so we can use this to store
      // our promise to let the server know when it can render
      getState().router = promise;
    }

    return promise;
  }

  return next(action);
};
