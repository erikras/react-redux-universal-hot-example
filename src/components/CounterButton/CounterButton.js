import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'multireducer';
import { increment } from 'redux/modules/counter';

@connect(
  (state, { multireducerKey: key }) => ({ count: state.counter[key].count }),
  (dispatch, { multireducerKey: key }) => bindActionCreators({ increment }, dispatch, key)
)
export default class CounterButton extends Component {
  static propTypes = {
    count: PropTypes.number,
    increment: PropTypes.func.isRequired,
    className: PropTypes.string
  }

  static defaultProps = {
    className: ''
  }

  render() {
    const { count, increment } = this.props; // eslint-disable-line no-shadow
    let { className } = this.props;
    className += ' btn btn-default';
    return (
      <button className={className} onClick={increment}>
        You have clicked me {count} time{count === 1 ? '' : 's'}.
      </button>
    );
  }
}
