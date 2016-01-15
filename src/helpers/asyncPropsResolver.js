export default (Component, params, cb) => {
  const result = Component.loadProps(params);
  return result ? Component.loadProps(params).then(cb, cb) : cb();
};
