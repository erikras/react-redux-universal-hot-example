import React, { Component, PropTypes } from 'react';

export default class Snippet extends Component {

  static propTypes = {
    params: PropTypes.object,
  }

  render() {
    const key = this.props.params.key;

    return (
      <div className="snippy">
        <p>I am a snippety snippy number {key}</p>
      </div>
    );
  }
}
