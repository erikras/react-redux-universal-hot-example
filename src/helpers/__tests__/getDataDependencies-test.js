import { expect } from 'chai';
import React from 'react';
import { div } from 'react-dom';
import getDataDependencies from '../getDataDependencies';

describe('getDataDependencies', () => {
  let getState;
  let dispatch;
  let location;
  let params;
  let CompWithFetchData;
  let CompWithNoData;
  let CompWithFetchDataDeferred;
  let ConnectedCompWithFetchData;
  let ConnectedCompWithFetchDataDeferred;

  beforeEach(() => {
    getState = 'getState';
    dispatch = 'dispatch';
    location = 'location';
    params = 'params';

    CompWithNoData = () =>
      <div />;

    CompWithFetchData = () =>
      <div />;

    CompWithFetchData.fetchData = (_getState, _dispatch, _location, _params) => {
      return `fetchData ${_getState} ${_dispatch} ${_location} ${_params}`;
    };
    CompWithFetchDataDeferred = () =>
      <div />;

    CompWithFetchDataDeferred.fetchDataDeferred = (_getState, _dispatch, _location, _params) => {
      return `fetchDataDeferred ${_getState} ${_dispatch} ${_location} ${_params}`;
    };

    ConnectedCompWithFetchData = () =>
      <div/>;

    ConnectedCompWithFetchData.WrappedComponent = CompWithFetchData;

    ConnectedCompWithFetchDataDeferred = () =>
      <div/>;

    ConnectedCompWithFetchDataDeferred.WrappedComponent = CompWithFetchDataDeferred;
  });

  it('should get fetchDatas', () => {
    const deps = getDataDependencies([
      CompWithFetchData,
      CompWithNoData,
      CompWithFetchDataDeferred,
      ConnectedCompWithFetchData,
      ConnectedCompWithFetchDataDeferred
    ], getState, dispatch, location, params);

    expect(deps).to.deep.equal([
      'fetchData getState dispatch location params',
      'fetchData getState dispatch location params'
    ]);
  });

  it('should get fetchDataDeferreds', () => {
    const deps = getDataDependencies([
      CompWithFetchData,
      CompWithNoData,
      CompWithFetchDataDeferred,
      ConnectedCompWithFetchDataDeferred
    ], getState, dispatch, location, params, true);

    expect(deps).to.deep.equal([
      'fetchDataDeferred getState dispatch location params',
      'fetchDataDeferred getState dispatch location params'
    ]);
  });
});
