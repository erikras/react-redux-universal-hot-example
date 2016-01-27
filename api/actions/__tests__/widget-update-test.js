/* eslint func-names:0 */
import {expect} from 'chai';
import update from '../widget/update';
import sinon from 'sinon';

describe('widget update', function() {
  afterEach(function() {
    if ('restore' in Math.random) {
      Math.random.restore(); // reset the Math.random fixture
    }
  });

  describe('randomly successful', function() {
    beforeEach(function() {
      sinon.stub(Math, 'random').returns(0.3);
    });

    it('does not accept green widgets', function() {
      return update({session: {}, body: {color: 'Green'}}).
      then(
        ()=> {
        },
        (err)=> {
          expect(err.color).to.equal('We do not accept green widgets');
        });
    });

    it('updates a widget', function() {
      const widget = {id: 2, color: 'Blue'};
      return update({session: {}, body: widget}).
      then(
        (res)=> {
          expect(res).to.deep.equal(widget);
        });
    });
  });

  describe('randomly unsuccessful', function() {
    beforeEach(function() {
      sinon.stub(Math, 'random').returns(0.1);
    });

    it('rejects the call in 20% of the time', function() {
      return update().
      then(
        ()=> {
        },
        (err)=> {
          expect(err).to.equal('Oh no! Widget save fails 20% of the time. Try again.');
        });
    });
  });
});
