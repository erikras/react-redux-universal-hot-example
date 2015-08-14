import React from 'react/addons';
import {expect} from 'chai';
import InfoBar from '../InfoBar';
import { Provider } from 'react-redux';
import createStore from 'redux/create';
import ApiClient from 'ApiClient';
const { TestUtils } = React.addons;
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

  const store = createStore(client, mockStore);
  const renderer = TestUtils.renderIntoDocument(
    <Provider store={store} key="provider">
      {() => <InfoBar/>}
    </Provider>
  );
  const dom = React.findDOMNode(renderer);

  it('should render correctly', () => {
    expect(renderer).to.be.ok;
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
    const styles = require('../InfoBar.scss');
    expect(styles.infoBar).to.be.a('string');
    expect(dom.className).to.include(styles.infoBar);
  });

});
