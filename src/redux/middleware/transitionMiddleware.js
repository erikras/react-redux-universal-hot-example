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
    if (locationsAreEqual(action.payload.location, getState().router.location)) {
      next(action);
    } else {
      const {components, location, params} = action.payload;
      const promises = getDataDependencies(components, getState, dispatch, location, params);

      if (promises.length > 0) {
        Promise.all(promises)
          .then(
            () => next(action)
          );
      } else {
        next(action);
      }
    }
  } else {
    next(action);
  }
};
