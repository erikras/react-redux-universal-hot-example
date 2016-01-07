import { expect } from 'chai';
import React from 'react';
import { IndexRoute, Route } from 'react-router';
import makeRouteHooksSafe from '../makeRouteHooksSafe';


describe('makeRouteHooksSafe', () => {
  it('should work with JSX routes', () => {
    const onEnter = () => {
      throw new Error('Shouldn\'t call onEnter');
    };

    const getRoutes = makeRouteHooksSafe(() => {
      return (
        <Route path="/" >
          <IndexRoute onEnter={onEnter} />
          <Route path="1" />
          <Route onEnter={onEnter}>
            <Route path="2" />
            <Route path="3" onEnter={onEnter}/>
          </Route>
        </Route>
      );
    });

    const routes = getRoutes(null);

    expect(routes[0].indexRoute.onEnter).to.not.throw(Error);
    expect(routes[0].childRoutes[1].onEnter).to.not.throw(Error);
    expect(routes[0].childRoutes[1].childRoutes[1].onEnter).to.not.throw(Error);
  });

  it('should work with JS routes', () => {
    const onEnter = () => {
      throw new Error('Shouldn\'t call onEnter');
    };

    const getRoutes = makeRouteHooksSafe(() => {
      return {
        path: '/',
        indexRoute: {
          onEnter: onEnter
        },
        onEnter: onEnter,
        childRoutes: [
          {path: '1'},
          {
            onEnter: onEnter,
            childRoutes: [
              {path: '2'},
              {path: '3'}
            ],
          }
        ]
      };
    });

    const routes = getRoutes(null);

    expect(routes[0].indexRoute.onEnter).to.not.throw(Error);
    expect(routes[0].onEnter).to.not.throw(Error);
    expect(routes[0].childRoutes[1].onEnter).to.not.throw(Error);
  });

  it('should call onEnter if store is initialised', (done) => {
    const store = {
      getState: () => {}
    };

    const getRoutes = makeRouteHooksSafe(() => {
      return {
        onEnter: () => {
          done();
        }
      };
    });

    const routes = getRoutes(store);

    routes[0].onEnter();
  });

  it('should call callback', (done) => {
    const getRoutes = makeRouteHooksSafe(() => {
      return {
        onEnter: (nextState, replaceState, cb) => {} // eslint-disable-line no-unused-vars
      };
    });

    const routes = getRoutes(null);

    routes[0].onEnter(null, null, done);
  });

  it('should not call callback', () => {
    const callback = () => {
      throw new Error('Should not be called');
    };

    const getRoutes = makeRouteHooksSafe(() => {
      return {
        onEnter: (nextState, replaceState) => {} // eslint-disable-line no-unused-vars
      };
    });

    const routes = getRoutes(null);

    routes[0].onEnter(null, null, callback);
  });
});
