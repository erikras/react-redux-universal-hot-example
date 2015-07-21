import React, {Component} from 'react';
import CounterButton from '../components/CounterButton';

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home</h1>

        <div>
          <CounterButton/>
        </div>
      </div>
    );
  }
}
