import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Modal extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    history: PropTypes.object,
    returnTo: PropTypes.string
  }

  styles: {
    position: 'fixed',
    top: '20%',
    right: '20%',
    bottom: '20%',
    left: '20%',
    padding: 20,
    boxShadow: '0px 0px 60px 5px rgba(0, 0, 0, 0.33)',
    overflow: 'auto',
    background: '#fff'
  }

  render() {
    return (
      <div style={this.styles}>
        <p><Link to={this.props.returnTo}>Back</Link></p>
        {this.props.children}
      </div>
    );
  }
}
