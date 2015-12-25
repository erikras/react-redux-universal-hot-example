import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import {Alert} from 'react-bootstrap';
import * as authActions from 'redux/modules/auth';
import config from '../../config';

@connect(
  state => ({
    user: state.auth.user,
    loginError: state.auth.loginError
  }),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    loginError: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const input = this.refs.username;
    this.props.login(input.value);
    input.value = '';
  }

  render() {
    const {user, loginError, logout} = this.props;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <DocumentMeta title={config.app.title + ': Login'}/>
        <h1>Login</h1>
        {loginError &&
        <Alert bsStyle="danger">
          <strong>Error!</strong> {loginError.message}
        </Alert>
        }
        {!user &&
        <div>
          <form className="login-form form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" ref="username" placeholder="Enter a username" className="form-control"/>
            </div>
            <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
            </button>
          </form>
          <p>This will "log you in" as this user, storing the username in the session of the API server.<br/>
            Enter <code>noaccess</code> as username to get an <code>UNAUTHORIZED</code> error.</p>
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
