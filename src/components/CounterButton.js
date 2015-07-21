import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as counterActions from '../actions/counterActions';

class CounterButton extends Component {
  static propTypes = {
    count: PropTypes.number,
    increment: PropTypes.func.isRequired,
    className: PropTypes.string
  }

  props = {
    className: ''
  }

  render() {
    const {count, increment} = this.props;
    let {className} = this.props;
    className += ' btn btn-default';
    return (
      <button className={className} onClick={increment}>
        You have clicked me {count} time{count === 1 ? '' : 's'}.
      </button>
    );
  }
}

@connect(state => ({
  count: state.counter.count
}))
export default
class CounterButtonContainer {
  static propTypes = {
    count: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    className: PropTypes.string
  }

  render() {
    const { dispatch } = this.props;
    return <CounterButton {...this.props} {...bindActionCreators(counterActions, dispatch)}/>;
  }
}
