import React, {Component} from 'react';

export default class Redirect extends Component {
  static onEnter(nextState, transition) {
    transition.to('/', null, {nextPathname: nextState.location.pathname});
  }
  render() {
    return (
      <div>This shouldn't render in the browser</div>
    );
  }
}
