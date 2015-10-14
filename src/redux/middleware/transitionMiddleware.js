import {ROUTER_DID_CHANGE} from 'redux-router/lib/constants';
import shallowequal from 'shallowequal';
import getDataDependencies from '../../helpers/getDataDependencies';

const locationsAreEqual = (locA, locB) => {
  if (!shallowequal(locA.pathname, locB.pathname)) {
    return false;
  }

  if (!shallowequal(locA.search, locB.search)) {
    return false;
  }

  return true;
};

export default ({getState, dispatch}) => next => action => {
  if (action.type === ROUTER_DID_CHANGE) {
    if (getState().router && locationsAreEqual(action.payload.location, getState().router.location)) {
      next(action);
    } else {
      const {components, location, params} = action.payload;
      const promise = new Promise((resolve) => {

        const doTransition = () => {
          next(action);
          Promise.all(getDataDependencies(components, getState, dispatch, location, params, true))
            .then(resolve, resolve);
        };

        Promise.all(getDataDependencies(components, getState, dispatch, location, params))
          .then(doTransition, doTransition);
      });

      if (__SERVER__) {
        // router state is null until ReduxRouter is created so we can use this to store
        // our promise to let the server know when it can render
        getState().router = promise;
      }
    }
  } else {
    next(action);
  }
};
