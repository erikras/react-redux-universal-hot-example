import { expect } from 'chai';
import getStatusFromRoutes from '../getStatusFromRoutes';

describe('getStatusFromRoutes', () => {
  it('should return null when no routes have status code', () => {
    const status = getStatusFromRoutes([
        {}, {}
    ]);

    expect(status).to.equal(null);
  });

  it('should return the only status code', () => {
    const status = getStatusFromRoutes([
        {status: 404}
    ]);

    expect(status).to.equal(404);
  });

  it('should return the only status code when other routes have none', () => {
    const status = getStatusFromRoutes([
        {status: 404}, {}, {}
    ]);

    expect(status).to.equal(404);
  });

  it('should return the last status code when later routes have none', () => {
    const status = getStatusFromRoutes([
        {status: 200}, {status: 404}, {}
    ]);

    expect(status).to.equal(404);
  });

  it('should return the last status code when previous routes have one', () => {
    const status = getStatusFromRoutes([
        {status: 200}, {}, {status: 404}
    ]);

    expect(status).to.equal(404);
  });

  it('should return the last status code', () => {
    const status = getStatusFromRoutes([
        {}, {}, {status: 404}
    ]);

    expect(status).to.equal(404);
  });
});
