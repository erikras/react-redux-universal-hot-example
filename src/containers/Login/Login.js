import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { LoginForm, FacebookLogin } from 'components';
import * as authActions from 'redux/modules/auth';
import * as notifActions from 'redux/modules/notifs';

@connect(
  state => ({ user: state.auth.user }),
  { ...notifActions, ...authActions })
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    oauthLogin: PropTypes.func,
    logout: PropTypes.func,
    notifSend: PropTypes.func
  }

  static contextTypes = {
    router: PropTypes.object
  }

  onFacebookLogin = (err, data) => {
    if (err) return;
    this.props.oauthLogin('facebook', data)
      .then(this.successLogin)
      .catch(error => {
        if (error.message === 'Incomplete oauth registration') {
          this.context.router.push({
            pathname: '/register',
            state: { oauth: error.data }
          });
        }
      });
  };

  login = data => this.props.login(data).then(this.successLogin);

  successLogin = data => {
    this.props.notifSend({
      message: 'You\'r logged !',
      kind: 'success',
      dismissAfter: 2000
    });
    return data;
  };

  FacebookLoginButton = ({ facebookLogin }) =>
    <button className="btn btn-primary" onClick={facebookLogin}>
      Login with <i className="fa fa-facebook-f" />
    </button>;

  render() {
    const { user, logout } = this.props;
    return (
      <div className="container">
        <Helmet title="Login" />
        <h1>Login</h1>
        {!user && <div>
          <LoginForm onSubmit={this.login} />
          <p>This will "log you in" as this user, storing the username in the session of the API server.</p>
          <FacebookLogin
            appId="635147529978862"
            /* autoLoad={true} */
            fields="name,email,picture"
            callback={this.onFacebookLogin}
            component={this.FacebookLoginButton}
          />
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
