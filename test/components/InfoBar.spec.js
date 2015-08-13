import expect from 'expect';
import jsdomReact from '../domUtil';
import React from 'react/addons';
import InfoBar from '../../src/components/InfoBar';

const { TestUtils } = React.addons;

function setup() {
  let props = {
    store: {
      getState: () => ({
        info: {
          loading: false,
          loaded: true,
          data: {
            message: 'This came from the api server',
            time: Date.now()
          }
        },
        load: expect.createSpy()
      })
    }
  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<InfoBar {...props} />);
  let output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
    renderer: renderer
  };
}

describe('InfoBar', () => {
  jsdomReact();

  it('should render correctly', () => {
    const { output } = setup();
    console.log(output.children);
  });
});
