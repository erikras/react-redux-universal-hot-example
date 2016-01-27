/* eslint func-names:0 */
import { expect } from 'chai';
import getStatusFromRoutes from '../getStatusFromRoutes';

describe('getStatusFromRoutes', function() {
  it('should return null when no routes have status code', function() {
    const status = getStatusFromRoutes([
        {}, {}
    ]);

    expect(status).to.equal(null);
  });

  it('should return the only status code', function() {
    const status = getStatusFromRoutes([
        {status: 404}
    ]);

    expect(status).to.equal(404);
  });

  it('should return the only status code when other routes have none', function() {
    const status = getStatusFromRoutes([
        {status: 404}, {}, {}
    ]);

    expect(status).to.equal(404);
  });

  it('should return the last status code when later routes have none', function() {
    const status = getStatusFromRoutes([
        {status: 200}, {status: 404}, {}
    ]);

    expect(status).to.equal(404);
  });

  it('should return the last status code when previous routes have one', function() {
    const status = getStatusFromRoutes([
        {status: 200}, {}, {status: 404}
    ]);

    expect(status).to.equal(404);
  });

  it('should return the last status code', function() {
    const status = getStatusFromRoutes([
        {}, {}, {status: 404}
    ]);

    expect(status).to.equal(404);
  });
});
