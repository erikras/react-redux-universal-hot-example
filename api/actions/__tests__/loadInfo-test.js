/* eslint func-names:0 */
import {expect} from 'chai';
import loadInfo from '../loadInfo';
import timekeeper from 'timekeeper';

describe('loadInfo', function() {
  it('loads the current date', function() {
    const now = Date.now();
    timekeeper.freeze(now);

    return loadInfo().then(data => {
      expect(data).to.deep.equal({time: now, message: 'This came from the api server'});
    });
  });
});
