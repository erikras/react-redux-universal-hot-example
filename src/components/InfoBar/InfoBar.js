import React, {Component, PropTypes} from 'react';

export default class InfoBar extends Component {
  static propTypes = {
    info: PropTypes.object,
  }

  render() {
    const {info} = this.props; // eslint-disable-line no-shadow
    const styles = require('./InfoBar.scss');
    return (
      <div className={styles.infoBar + ' well'}>
        <div className="container">
          This is an info bar
          {' '}
          <strong>{info ? info.message : 'no info!'}</strong>
          <span className={styles.time}>{info && new Date(info.time).toString()}</span>
          <button className="btn btn-primary">Reload from server</button>
        </div>
      </div>
    );
  }
}
