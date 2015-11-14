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
  const NullComponent = null;

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
  });

  it('should get fetchDatas', () => {
    const deps = getDataDependencies([
      NullComponent,
      CompWithFetchData,
      CompWithNoData,
      CompWithFetchDataDeferred
    ], getState, dispatch, location, params);

    expect(deps).to.deep.equal([
      'fetchData getState dispatch location params'
    ]);
  });

  it('should get fetchDataDeferreds', () => {
    const deps = getDataDependencies([
      NullComponent,
      CompWithFetchData,
      CompWithNoData,
      CompWithFetchDataDeferred
    ], getState, dispatch, location, params, true);

    expect(deps).to.deep.equal([
      'fetchDataDeferred getState dispatch location params'
    ]);
  });
});
