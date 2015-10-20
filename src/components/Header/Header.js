import React, {Component, PropTypes} from 'react';

export default class Header extends Component {
  static propTypes = {
    title: PropTypes.string,
  }

  static defaultProps = { title: 'Explore the MSD' }

  render() {
    const {title} = this.props; // eslint-disable-line no-shadow
    const styles = require('./Header.scss');
    return (
      <header className={styles.pageHeader}>
        <div className="page-header-logo">
        </div>
        <div className="page-header-title">
          <h1>{title}</h1>
        </div>
        <div className="page-header-tools">
          <p><a href="#">Search</a></p>
        </div>
      </header>
    );
  }
}
