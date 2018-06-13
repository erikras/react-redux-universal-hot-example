import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';

import config from 'config';

@connect(
  state => ({
    user: state.auth.user,
    redirectPath: state.auth.redirectPath
  }),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
    loginFromToken: PropTypes.func.isRequired,
    redirect: PropTypes.func,
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const input = this.refs.username;
    this.props.login(input.value);
    input.value = '';
  }

  successLogin = () => {
    // this.props.notifSend({
    //   message: "You're logged !",
    //   kind: 'success',
    //   dismissAfter: 2000
    // });
  };

  async loginFromToken(userId, accessToken) {
    console.log("you' pressed loginFromToken!");
    console.log(accessToken);
    const result = await this.props.loginFromToken(userId, accessToken);
    this.successLogin();
    return result;
  }

  componentDidMount() {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get('accessToken');
    const userId = params.get('userId');

    if (!this.props.user &&
      (!accessToken || !userId)) {
        //FOr client only, make this server side
        // window.location.replace(`http://${config.authHost}${window.location.href.split(/[?#]/)[0]}`)
        this.props.redirect(window.location.href.split(/[?#]/)[0])
    }
    if (userId && accessToken) {
      console.log('do login from token');
      this.loginFromToken(userId, accessToken);
    }
  }

  render() {
    const {user, logout
      ,location
    } = this.props;

    // const params = new URLSearchParams(location.search);
    // const accessToken = params.get('accessToken');
    // const userId = params.get('userId');

    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Login"/>

        {
        //   !user &&
        // <div>
        //   <form className="login-form form-inline" onSubmit={this.handleSubmit}>
        //     <div className="form-group">
        //       <input type="text" ref="username" placeholder="Enter a username" className="form-control"/>
        //     </div>
        //     <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
        //     </button>
        //   </form>
        //   <p>This will "log you in" as this user, storing the username in the session of the API server.</p>
        // </div>
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
