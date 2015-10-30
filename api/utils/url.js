export function mapUrl(availableActions = {}, url = []) {

  const notFound = {action: null, params: []};

  // test for empty input
  if (url.length === 0 || Object.keys(availableActions).length === 0) {
    return notFound;
  }
  /*eslint-disable */
  const reducer = (next, current) => {
    if (next.action && next.action[current]) {
      return {action: next.action[current], params: []}; // go deeper
    } else {
      if (typeof next.action === 'function') {
        return {action: next.action, params: next.params.concat(current)}; // params are found
      } else {
        return notFound;
      }
    }
  };
  /*eslint-enable */

  const actionAndParams = url.reduce(reducer, {action: availableActions, params: []});

  return (typeof actionAndParams.action === 'function') ? actionAndParams : notFound;
}
