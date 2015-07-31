import React from 'react';
import Router from 'react-router';
import routes from './views/routes';
import { Provider } from 'react-redux';

const getFetchData = (component={}) => {
  return component.DecoratedComponent ?
    getFetchData(component.DecoratedComponent) :
    component.fetchData;
};

export function createTransitionHook(store) {
  return (nextState, transition, callback) => {
    const promises = nextState.branch
      .map(route => route.component)                          // pull out individual route components
      .filter((component) => getFetchData(component))         // only look at ones with a static fetchData()
      .map(getFetchData)                                      // pull out fetch data methods
      .map(fetchData => fetchData(store, nextState.params));  // call fetch data methods and save promises
    Promise.all(promises)
      .then(() => {
        callback(); // can't just pass callback to then() because callback assumes first param is error
      }, (error) => {
        callback(error);
      });
  };
}

export default function universalRouter(location, history, store) {
  return new Promise((resolve, reject) => {
    Router.run(routes, location, [createTransitionHook(store)], (error, initialState, transition) => {
      if (error) {
        return reject(error);
      }

      if (transition && transition.redirectInfo) {
        return resolve({
          transition,
          isRedirect: true
        });
      }

      if (history) {  // only on client side
        initialState.history = history;
      }

      const component = (
        <Provider store={store} key="provider">
          {() => <Router {...initialState} children={routes}/>}
        </Provider>
      );

      return resolve({
        component,
        isRedirect: false
      });
    });
  });
}
