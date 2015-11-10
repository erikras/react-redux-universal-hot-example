import React, { Component } from 'react';
import hoistStatics from 'hoist-non-react-statics';

/*
  Note:
    When this decorator is used, it MUST be the first (outermost) decorator.
    Otherwise, we cannot find and call the fetchData and fetchDataDeffered methods.
*/

export default function connectData(fetchData, fetchDataDeferred) {

  return function wrapWithFetchData(WrappedComponent) {
    class ConnectData extends Component {
      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    ConnectData.fetchData = fetchData;
    ConnectData.fetchDataDeferred = fetchDataDeferred;

    return hoistStatics(ConnectData, WrappedComponent);
  };
}
