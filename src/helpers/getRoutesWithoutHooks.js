import { createRoutes } from 'react-router/lib/RouteUtils';

function removeHooks(routes) {
  if (Array.isArray(routes)) {
    return routes.map(removeHooks);
  }

  delete routes.onEnter;

  if (routes.childRoutes) {
    removeHooks(routes.childRoutes);
  }

  return routes;
}

export default function getRoutesWithoutHooks(_getRoutes) {
  return (store) => removeHooks(createRoutes(_getRoutes(store)));
}
