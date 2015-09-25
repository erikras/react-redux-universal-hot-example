import qs from 'query-string';
import React from 'react';
import {match, RoutingContext} from 'react-router';
import createRoutes from '../routes';
import {Provider} from 'react-redux';

const getFetchData = (component = {}) => {
  return component.WrappedComponent ?
    getFetchData(component.WrappedComponent) :
    component.fetchData;
};

const fetchDataForContainers = (containers, store, params, query) => {
  const promises = containers
    .filter((component) => getFetchData(component))         // only look at ones with a static fetchData()
    .map(getFetchData)                                      // pull out fetch data methods
    .map(fetchData => fetchData(store, params, query || {}));  // call fetch data methods and save promises

  return Promise.all(promises);
};

export default function universalRouter(location, history, store, preload) {
  const routes = createRoutes(store);
  return new Promise((resolve, reject) => {
    match({routes, history, location}, (error, redirectLocation, renderProps) => {
      if (error) {
        return reject(error);
      }

      if (redirectLocation) {
        return resolve({
          redirectLocation
        });
      }

      if (history) {  // only on client side
        renderProps.history = history;
      }

      function resolveWithComponent() {
        const component = (
          <Provider store={store} key="provider">
            <RoutingContext {...renderProps}/>
          </Provider>
        );

        resolve({
          component
        });
      }

      if (preload) {
        fetchDataForContainers(
          renderProps.components,
          store,
          renderProps.params,
          qs.parse(renderProps.location.search)
        )
          .then(() => resolveWithComponent(), err => reject(err));
      } else {
        resolveWithComponent();
      }
    });
  });
}
