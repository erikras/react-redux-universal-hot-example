import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { load } from 'redux/modules/info';

function InfoBar() {
  const { info, load } = this.props; // eslint-disable-line no-shadow
  const styles = require('./InfoBar.scss');
  return (
    <div className={`${styles.infoBar} well`}>
      <div className="container">
        This is an info bar
        {' '}
        <strong>{info ? info.message : 'no info!'}</strong>
        <span className={styles.time}>{info && new Date(info.time).toString()}</span>
        <button className="btn btn-primary" onClick={load}>Reload from server</button>
      </div>
    </div>
  );
}

InfoBar.propTypes = {
  info: PropTypes.object,
  load: PropTypes.func.isRequired
};

export default connect(
  state => ({ info: state.info.data }),
  dispatch => bindActionCreators({ load }, dispatch)
)(InfoBar);
