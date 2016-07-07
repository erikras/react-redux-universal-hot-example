import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { LoginForm } from 'components';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({ user: state.auth.user }),
  { ...authActions })
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
    notifSend: PropTypes.func
  }

  login = data => this.props.login(data)
  .then(result => {
    this.props.notifSend({
      message: 'You\'r logged !',
      kind: 'success',
      dismissAfter: 2000
    });
    return result;
  });

  render() {
    const { user, logout } = this.props;
    return (
      <div className="container">
        <Helmet title="Login" />
        <h1>Login</h1>
        {!user && <div>
          <LoginForm onSubmit={this.login} />
          <p>This will "log you in" as this user, storing the username in the session of the API server.</p>
        </div>
        }
        {user && <div>
          <p>You are currently logged in as {user.email}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out" />{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}
