import { expect } from 'chai';
import React from 'react';
import { IndexRoute, Route } from 'react-router';
import getRoutesWithoutHooks from '../getRoutesWithoutHooks';

const noop = () => {};

describe('getRoutesWithoutHooks', () => {

  it('should work with JSX routes', () => {
    const getRoutes = getRoutesWithoutHooks(() => {
      return (
        <Route path="/" >
          <IndexRoute />
          <Route path="1" />
          <Route onEnter={noop}>
            <Route path="2" />
            <Route path="3" onEnter={noop}/>
          </Route>
        </Route>
      );
    });

    expect(getRoutes()).to.deep.equal([
      {
        path: '/',
        indexRoute: {},
        childRoutes: [
          {path: '1'},
          {
            childRoutes: [
              {path: '2'},
              {path: '3'}
            ],
          }
        ]
      }
    ]);
  });

  it('should work with JS routes', () => {
    const getRoutes = getRoutesWithoutHooks(() => {
      return {
        path: '/',
        indexRoute: {},
        onEnter: noop,
        childRoutes: [
          {path: '1'},
          {
            onEnter: noop,
            childRoutes: [
              {path: '2'},
              {path: '3'}
            ],
          }
        ]
      };
    });

    expect(getRoutes()).to.deep.equal([
      {
        path: '/',
        indexRoute: {},
        childRoutes: [
          {path: '1'},
          {
            childRoutes: [
              {path: '2'},
              {path: '3'}
            ],
          }
        ]
      }
    ]);
  });

  it('should pass through store', () => {
    const store = {};

    const getRoutes = getRoutesWithoutHooks((_store) => {
      expect(_store).to.equal(store);
    });

    getRoutes(store);
  });
});
