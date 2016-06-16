import {expect} from 'chai';
import {mapUrl} from '../utils/url';

describe('mapUrl', () => {
  it('extracts nothing if both params are undefined', () => {
    expect(mapUrl(undefined, undefined)).to.deep.equal({
      action: null,
      params: []
    });
  });

  it('extracts nothing if the url is empty', () => {
    const url = '';
    const splittedUrlPath = url.split('?')[0].split('/').slice(1);
    const availableActions = {a: 1, widget: {c: 1, load: () => 'baz'}};

    expect(mapUrl(availableActions, splittedUrlPath)).to.deep.equal({
      action: null,
      params: []
    });
  });

  it('extracts nothing if nothing was found', () => {
    const url = '/widget/load/?foo=bar';
    const splittedUrlPath = url.split('?')[0].split('/').slice(1);
    const availableActions = {a: 1, info: {c: 1, load: () => 'baz'}};

    expect(mapUrl(availableActions, splittedUrlPath)).to.deep.equal({
      action: null,
      params: []
    });
  });

  it('extracts the available actions and the params from an relative url string with GET params', () => {
    const url = '/widget/load/param1/xzy?foo=bar';
    const splittedUrlPath = url.split('?')[0].split('/').slice(1);
    const availableActions = {a: 1, widget: {c: 1, load: () => 'baz'}};

    expect(mapUrl(availableActions, splittedUrlPath)).to.deep.equal({
      action: availableActions.widget.load,
      params: ['param1', 'xzy']
    });
  });

  it('extracts the available actions from an url string without GET params', () => {
    const url = '/widget/load/?foo=bar';
    const splittedUrlPath = url.split('?')[0].split('/').slice(1);
    const availableActions = {a: 1, widget: {c: 1, load: () => 'baz'}};

    expect(mapUrl(availableActions, splittedUrlPath)).to.deep.equal({
      action: availableActions.widget.load,
      params: ['']
    });
  });

  it('does not find the avaialble action if deeper nesting is required', () => {
    const url = '/widget';
    const splittedUrlPath = url.split('?')[0].split('/').slice(1);
    const availableActions = {a: 1, widget: {c: 1, load: () => 'baz'}};

    expect(mapUrl(availableActions, splittedUrlPath)).to.deep.equal({
      action: null,
      params: []
    });
  });
});
