import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Modal extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    returnTo: PropTypes.string
  }

  render() {
    const styles = {
      position: 'fixed',
      top: '20%',
      right: '20%',
      bottom: '20%',
      left: '20%',
      padding: '20px',
      boxShadow: '0px 0px 60px 2px rgba(0, 0, 0, 0.75)',
      overflow: 'auto',
      background: '#fff'
    };

    return (
      <div style={styles}>
        <p><Link to={this.props.returnTo}>Back</Link></p>
        { this.props.children }
      </div>
    );
  }
}
