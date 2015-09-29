export default (routes) => {
  return routes.reduce((prev, cur) => {
    return cur.status || prev.status;
  });
};
