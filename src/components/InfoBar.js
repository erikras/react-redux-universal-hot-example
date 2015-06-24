import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'redux/react';
import * as infoActions from '../actions/infoActions';
if (__CLIENT__) {
  require('./InfoBar.scss');
}

class InfoBar {
  render() {
    const {info, load} = this.props;
    return (
      <div className="info-bar well">
        This is an info bar
        {' '}
        <strong>{info ? info.message : 'no info!'}</strong>
        <span className="time">{info && new Date(info.time).toString()}</span>
        <button className="btn btn-primary" onClick={load}>Reload from server</button>
      </div>
    );
  }
}

@connect(state => ({
  info: state.info.data
}))
export default class InfoBarContainer {
  render() {
    const { info, dispatch } = this.props;
    return <InfoBar info={info} {...bindActionCreators(infoActions, dispatch)}/>;
  }
}