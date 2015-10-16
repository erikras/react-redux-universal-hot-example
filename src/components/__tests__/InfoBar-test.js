import React from 'react';
import ReactDOM from 'react-dom';
import {renderIntoDocument} from 'react-addons-test-utils';
import { expect} from 'chai';
import { InfoBar } from 'components';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import {reduxReactRouter} from 'redux-router';
import createHistory from 'history/lib/createMemoryHistory';
import createStore from 'redux/create';
import ApiClient from 'helpers/ApiClient';
import { intlDataHash } from 'utils/intl';
const client = new ApiClient();

describe('InfoBar', () => {
  const mockStore = {
    info: {
      load: () => {},
      loaded: true,
      loading: false,
      data: {
        message: 'This came from the api server',
        time: Date.now()
      }
    }
  };

  const localeFromRoute = 'en';
  const locale = intlDataHash[localeFromRoute].locale;
  const localeMessages = require(`intl/${localeFromRoute}`);


  const store = createStore(reduxReactRouter, null, createHistory, client, mockStore);
  const renderer = renderIntoDocument(
    <Provider store={store} key="provider">
      <IntlProvider locale={locale} messages={localeMessages}>
        <InfoBar/>
      </IntlProvider>
    </Provider>
  );
  const dom = ReactDOM.findDOMNode(renderer);

  it('should render correctly', () => {
    return expect(renderer).to.be.ok;
  });

  it('should render with correct value', () => {
    const text = dom.getElementsByTagName('strong')[0].textContent;
    expect(text).to.equal(mockStore.info.data.message);
  });

  it('should render with a reload button', () => {
    const text = dom.getElementsByTagName('button')[0].textContent;
    expect(text).to.be.a('string');
  });

  it('should render the correct className', () => {
    const styles = require('components/InfoBar/InfoBar.scss');
    expect(styles.infoBar).to.be.a('string');
    expect(dom.className).to.include(styles.infoBar);
  });

});
