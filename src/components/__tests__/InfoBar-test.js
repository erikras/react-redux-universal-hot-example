import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { InfoBarPure as InfoBar } from '../InfoBar/InfoBar';

function setup(props = {}) {
  const actions = {
    load: expect.createSpy()
  };
  const component = shallow(
    <InfoBar {...(Object.assign({}, actions, props))} />
  );
  return {
    component: component,
    actions: actions,
    strongs: component.find('strong'),
    buttons: component.find('button')
  };
}

describe('InfoBar', () => {
  const mockStore = {
    info: {
      loaded: true,
      loading: false,
      data: {
        message: 'This came from the api server',
        time: Date.now()
      }
    }
  };

  const {component, actions, strongs, buttons} = setup(mockStore);

  it('should render correctly', () => {
    return expect(component).toExist();
  });

  it('should render with correct value', () => {
    expect(strongs.at(0).text()).toBe(mockStore.info.data.message);
    expect(component.find('span').at(0).text()).toBe((new Date(mockStore.info.data.time)).toString());
  });

  it('should render with a reload button', () => {
    expect(buttons.at(0).text()).toBeA('string');
  });

  it('should render the correct className', () => {
    const styles = require('components/InfoBar/InfoBar.scss');
    expect(styles.infoBar).toBeA('string');
    const classNames = component.find('div').at(0).node.props.className.split(' ');
    expect(classNames[0]).toBe(styles.infoBar);
  });
});