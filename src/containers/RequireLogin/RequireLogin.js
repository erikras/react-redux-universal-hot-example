import {Component} from 'react';

export default class RequireLogin extends Component {
  static onEnter(store) {
    return (nextState, replaceState) => {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replaceState(null, '/');
      }
    };
  }

  render() {
    return this.props.children;
  }
}
