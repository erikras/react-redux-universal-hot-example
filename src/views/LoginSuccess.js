import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {isLoaded as isAuthLoaded, load as loadAuth} from '../ducks/auth';
import * as authActions from '../ducks/auth';

@connect(
    state => ({user: state.auth.user}),
    dispatch => bindActionCreators(authActions, dispatch)
)
export default
class LoginSuccess extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func
  }

  render() {
    const {user, logout} = this.props;
    return (
      <div className="container">
        <h1>Login Success</h1>

        <div>
          <p>Hi, {user.name}. You have just successfully logged in, and were forwarded here
            by <code>componentWillReceiveProps()</code> in <code>App.js</code>, which is listening to
            the auth reducer via redux <code>@connect</code>. How exciting!
          </p>

          <p>
            The same function will forward you to <code>/</code> should you chose to log out. The choice is yours...
          </p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
      </div>
    );
  }

  static fetchData(store) {
    if (!isAuthLoaded(store.getState())) {
      return store.dispatch(loadAuth());
    }
  }
}
