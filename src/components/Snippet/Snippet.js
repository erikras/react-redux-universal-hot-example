import React, { Component, PropTypes } from 'react';

export default class Snippet extends Component {

  static propTypes = {
    location: PropTypes.object,
    params: PropTypes.object,
    snippet: PropTypes.object,
  }

  render() {
    const slug = this.props.params.slug;
    const snippetFromState = this.props.location.state.snippets[slug];
    const snippetFromProps = this.props.snippet;
    const {title} = ( snippetFromState || snippetFromProps );
    console.log('title: ', title);
    if (!title) return (<h2>Cannot render snippet</h2>);
    return (
      <div className="snippy">
        <h2>{title}</h2>
        <p>I am a snippy slug <strong>{slug}</strong></p>
      </div>
    );
  }
}
