import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class GithubButton extends Component {
  static propTypes = {
    user: PropTypes.string.isRequired,
    repo: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['star', 'watch', 'fork', 'follow']).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    count: PropTypes.bool.isRequired,
    large: PropTypes.bool.isRequired
  };

  render() {
    const { user, repo, type, width, height, count, large } = this.props;
    let src = `https://ghbtns.com/github-btn.html?user=${user}&repo=${repo}&type=${type}`;
    if (count) src += '&count=true';
    if (large) src += '&size=large';

    return (
      <iframe
        title={`github-button-${user}-${repo}-${type}`}
        src={src}
        frameBorder="0"
        allowTransparency="true"
        scrolling="0"
        width={width}
        height={height}
        style={{ border: 'none', width, height }}></iframe>
    );
  }
}
