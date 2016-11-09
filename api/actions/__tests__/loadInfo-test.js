import { expect } from 'chai';
import timekeeper from 'timekeeper';
import loadInfo from '../loadInfo';

describe('loadInfo', () => {
  it('loads the current date', () => {
    const now = Date.now();
    timekeeper.freeze(now);

    expect(loadInfo()).to.deep.equal({ time: now, message: 'This came from the api server' });
  });
});
