import React, { Component } from 'react';

/*
  Note:
    When this decorator is used, it MUST be the first (outermost) decorator.
    Otherwise, we cannot find and call the fetchData and fetchDataDeffered methods.
*/

export default function connectData(fetchData, fetchDataDeferred) {
  return function wrapWithFetchData(WrappedComponent) {
    class ConnectData extends Component {

      static fetchData = fetchData;
      static fetchDataDeferred = fetchDataDeferred;

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    return ConnectData;
  };
}
