import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({ user: state.auth.user }),
  authActions)
export default class Register extends Component {
  static propTypes = {
    user: PropTypes.object,
    register: PropTypes.func,
    logout: PropTypes.func
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const email = this.refs.email;
    const password = this.refs.password;
    this.props.register(email.value, password.value);
    email.value = '';
    password.value = '';
  }

  render() {
    const { user } = this.props;
    const styles = require('./Register.scss');
    return (
      <div className={styles.registerPage + ' container'}>
        <Helmet title="Register" />
        <h1>Register</h1>
        {!user && <div>
          <form className="register-form form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" ref="email" placeholder="Enter a username" className="form-control" />
            </div>
            <div className="form-group">
              <input type="password" ref="password" placeholder="Enter your password" className="form-control" />
            </div>
            <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in" />{' '}Register
            </button>
          </form>
        </div>
        }
      </div>
    );
  }
}
