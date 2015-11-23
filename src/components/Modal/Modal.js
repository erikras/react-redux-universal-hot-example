import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Modal extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    returnTo: PropTypes.string
  }

  render() {
    const styles = require('./Modal.scss');

    return (
      <div className={styles.modal}>
        <div className={styles.close}>
          <Link to={this.props.returnTo}>
            <span className={styles.icon}>×</span>
            <span className={styles.label}>Close</span>
          </Link>
        </div>
        { this.props.children }
      </div>
    );
  }
}
