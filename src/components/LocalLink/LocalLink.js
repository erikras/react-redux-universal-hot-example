import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class LocalLink extends Component {

  static propTypes = {
    to: PropTypes.string.isRequired,
    query: PropTypes.object,
    hash: PropTypes.string,
    state: PropTypes.object,
    activeStyle: PropTypes.object,
    activeClassName: PropTypes.string,
    onlyActiveOnIndex: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ])
  }

  static contextTypes = {
    currentLocale: PropTypes.string.isRequired
  };

  static defaultProps = {
    onlyActiveOnIndex: false,
    className: '',
    style: {}
  }

  render() {

    const {currentLocale} = this.context;
    const {to, children, ...props} = this.props;

    return (
      <Link to={`/${currentLocale}${to}`} {...props}>
        {children}
      </Link>
    );
  }
}
