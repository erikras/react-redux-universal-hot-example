/* eslint func-names:0 */
import { expect } from 'chai';
import React from 'react';
import { div } from 'react-dom';
import connectData from '../connectData';

describe('connectData', function() {
  let fetchData;
  let fetchDataDeferred;
  let WrappedComponent;
  let DataComponent;

  beforeEach(function() {
    fetchData = 'fetchDataFunction';
    fetchDataDeferred = 'fetchDataDeferredFunction';

    WrappedComponent = () =>
      <div />;

    DataComponent = connectData(fetchData, fetchDataDeferred)(WrappedComponent);
  });

  it('should set fetchData as a static property of the final component', function() {
    expect(DataComponent.fetchData).to.equal(fetchData);
  });

  it('should set fetchDataDeferred as a static property of the final component', function() {
    expect(DataComponent.fetchDataDeferred).to.equal(fetchDataDeferred);
  });
});
