import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { LoginForm, FacebookLogin } from 'components';
// import app from 'app';
import * as authActions from 'redux/modules/auth';
import * as notifActions from 'redux/modules/notifs';
// import cookie from 'js-cookie';

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

  onFacebookLogin = (err, data) => {
    if (err) return;
    this.props.oauthLogin('facebook', data)
      .then(this.successLogin); // TODO: finalize register (associate to an email & password for local auth)
  };

  login = data => this.props.login(data).then(this.successLogin);

  successLogin = data => {
    // Unsupported reconnection socket for now
    /* if (result.expires) {
      cookie.set('feathers-session', app.get('token'), { expires: result.expires / (60 * 60 * 24 * 1000) });
    } */
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
            appId="619121718248110"
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
