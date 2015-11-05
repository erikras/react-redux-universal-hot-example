import React, {Component, PropTypes} from 'react';
import {connectMultireducer} from 'multireducer';
import {increment} from 'redux/modules/counter';

import {connectTheme} from 'redux-theme';


@connectMultireducer(
  state => ({count: state.count}),
  {increment})
@connectTheme
export default class CounterButton extends Component {
  static propTypes = {
    count: PropTypes.number,
    increment: PropTypes.func.isRequired,
    styles: PropTypes.object,
    kind: PropTypes.string
  }

  render() {
    const {count, increment, styles, kind} = this.props; // eslint-disable-line no-shadow
    return (
      <button style={[styles.base, styles[kind]]} onClick={increment}>
        You have clicked me {count} time{count === 1 ? '' : 's'}.
      </button>
    );
  }
}
