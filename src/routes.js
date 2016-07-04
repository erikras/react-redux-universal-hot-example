import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { App, Home, NotFound } from 'containers';

/* Removi el parametro store de routes */
export default () => {
  /* Here you can declare functions to handle route events*/

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      {/* Home (main) route */}
      <IndexRoute component={Home} />

      {/* Routes requiring login */}

      {/* Routes disallow login */}

      {/* Routes */}

      {/* Catch all route */}
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
