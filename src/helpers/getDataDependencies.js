const getDataDependency = (component = {}) => {
  return component.WrappedComponent ?
    getDataDependency(component.WrappedComponent) :
    component.fetchData;
};

export default (components, getState, dispatch, location, params) => {
  return components
    .filter((component) => getDataDependency(component)) // only look at ones with a static fetchData()
    .map(getDataDependency)                              // pull out fetch data methods
    .map(fetchData =>
      fetchData(getState, dispatch, location, params));  // call fetch data methods and save promises
};
