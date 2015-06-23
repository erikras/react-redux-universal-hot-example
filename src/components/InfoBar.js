import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'redux/react';
import * as infoActions from '../actions/infoActions';
import Stylesheet from 'react-style';

const styles = Stylesheet.create({
  infoBar: {
    fontVariant: 'italics'
  },
  time: {
    marginLeft: 30,
    marginRight: 30
  }
});

class InfoBar {
  render() {
    const {info, load} = this.props;
    return (
      <div styles={[styles.infoBar]} className="well">
        This is an info bar
        {' '}
        <strong>{info ? info.message : 'no info!'}</strong>
        <span styles={[styles.time]}>{info && new Date(info.time).toString()}</span>
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