/*global __CLIENT__*/
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
if (__CLIENT__) {
  require('./InfoBar.scss');
}

class MiniInfoBar extends Component {
  static propTypes = {
    time: PropTypes.number
  }

  render() {
    const {time} = this.props;
    return (
      <div className="mini-info-bar">
        The info bar was last loaded at
        {' '}
        <span>{time && new Date(time).toString()}</span>
      </div>
    );
  }
}

@connect(state => ({
  time: state.info.data.time
}))
export default
class MiniInfoBarContainer {
  static propTypes = {
    time: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  render() {
    const { time } = this.props;
    return <MiniInfoBar time={time}/>;
    // no bindActionCreators() because this component is display-only
  }
}
