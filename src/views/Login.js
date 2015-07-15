/*global __CLIENT__*/
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {isLoaded as isAuthLoaded} from '../reducers/auth';
import * as authActions from '../actions/authActions';
import {load as loadAuth} from '../actions/authActions';
if (__CLIENT__) {
  require('./Login.scss');
}

class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  state = {
    username: ''
  }

  handleChange(event) {
    // normally you would encapsulate this state tracking into the input component
    this.setState({username: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const input = this.refs.username.getDOMNode();  // need for getDOMNode() call going away in React 0.14
    this.props.login(input.value);
    input.value = '';
  }

  render() {
    const {user, logout} = this.props;
    const {username} = this.state;
    return (
      <div className="login-page">
        <h1>Login</h1>
        {!user &&
        <div>
          <form className="login-form" onSubmit={::this.handleSubmit}>
            <input type="text" value={username} ref="username" onChange={::this.handleChange} placeholder="Enter a username"/>
            <button className="btn btn-success" onClick={::this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In</button>
          </form>
          <p>This will "log you in" as this user, storing the username in the session of the API server.</p>
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>
          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}

@connect(state => ({
  user: state.auth.user
}))
export default
class LoginContainer {
  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  }

  static fetchData(store) {
    if (!isAuthLoaded(store.getState())) {
      return store.dispatch(loadAuth());
    }
  }

  render() {
    const { user, dispatch } = this.props;
    return <Login user={user} {...bindActionCreators(authActions, dispatch)}>
      {this.props.children}
    </Login>;
  }
}
