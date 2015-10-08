/**
 * Return the status code from the last matched route with a status property.
 *
 * @param matchedRoutes
 * @returns {Number|undefined}
 */
export default (matchedRoutes) => {
  return matchedRoutes.reduce((prev, cur) => {
    if (cur && cur.status) {
      return cur.status;
    }

    if (prev && prev.status) {
      return prev.status;
    }
  });
};
