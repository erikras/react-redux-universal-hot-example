import React, { Component, PropTypes } from 'react';

export default class Snippet extends Component {

  static propTypes = {
    params: PropTypes.object,
  }

  render() {
    const slug = this.props.params.slug;

    return (
      <div className="snippy">
        <p>I am a snippy slug <strong>{slug}</strong></p>
      </div>
    );
  }
}
