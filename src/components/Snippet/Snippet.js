import React, { Component, PropTypes } from 'react';

export default class Snippet extends Component {
  static propTypes = {
    params: PropTypes.object,
  }

  render() {
    console.log('let\'s render a snippy');
    return (
      <div>
        I am a snippety snippy number {this.props.params.key}!
      </div>
    );
  }
}
