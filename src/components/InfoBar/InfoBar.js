import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {load} from 'redux/modules/info';

class InfoBar extends Component {
  static propTypes = {
    info: PropTypes.object,
    load: PropTypes.func.isRequired
  }

  render() {
    const {info, load} = this.props; // eslint-disable-line no-shadow
    const styles = require('./InfoBar.scss');
    return (
      <div className={styles.infoBar + ' well'}>
        <div className="container">
          This is an info bar
          {' '}
          <strong>{info ? info.data.message : 'no info!'}</strong>
          <span className={styles.time}>{info && new Date(info.data.time).toString()}</span>
          <button className="btn btn-primary" onClick={load}>Reload from server</button>
        </div>
      </div>
    );
  }
}

export { InfoBar as InfoBarPure };

export default connect(
  state => ({info: state.info.data}),
  dispatch => bindActionCreators({load}, dispatch)
)(InfoBar);
