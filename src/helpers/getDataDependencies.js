const getDataDependency = (component = {}, methodName) => {
  return component.WrappedComponent ?
    getDataDependency(component.WrappedComponent, methodName) :
    component[methodName];
};

export default (components, getState, dispatch, location, params, deferred) => {
  const methodName = deferred ? 'fetchDataDeferred' : 'fetchData';

  return components
    .filter((component) => getDataDependency(component, methodName)) // only look at ones with a static fetchData()
    .map((component) => getDataDependency(component, methodName))    // pull out fetch data methods
    .map(fetchData =>
      fetchData(getState, dispatch, location, params));  // call fetch data methods and save promises
};
