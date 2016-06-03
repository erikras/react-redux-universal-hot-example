import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {load} from 'redux/modules/info';

@connect(
    state => ({info: state.info.data}),
    dispatch => bindActionCreators({load}, dispatch))
export default class InfoBar extends Component {
  static propTypes = {
    info: PropTypes.object,
    load: PropTypes.func.isRequired
  }

  render() {
    const {info, load} = this.props; // eslint-disable-line no-shadow
    const styles = require('./InfoBar.scss');
    return (
      <div class={styles.infoBar + ' well'}>
        <div class="container">
          This is an info bar
          {' '}
          <strong>{info ? info.message : 'no info!'}</strong>
          <span class={styles.time}>{info && new Date(info.time).toString()}</span>
          <button class="btn btn-primary" onClick={load}>Reload from server</button>
        </div>
      </div>
    );
  }
}
