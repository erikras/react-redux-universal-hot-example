/*global __CLIENT__*/
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {isLoaded as isInfoLoaded} from '../reducers/info';
import {isLoaded as isAuthLoaded} from '../reducers/auth';
import {load as loadInfo} from '../actions/infoActions';
import * as authActions from '../actions/authActions';
import {load as loadAuth} from '../actions/authActions';
import InfoBar from '../components/InfoBar';
import {createTransitionHook} from '../universalRouter';
if (__CLIENT__) {
  require('./App.scss');
}

class App extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  componentWillMount() {
    const {router, store} = this.context;
    router.addTransitionHook(createTransitionHook(store));
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    const {user} = this.props;
    return (
      <div className="container app">
        <div className="jumbotron">
          <h1>React Redux Example</h1>

          <p>
            by <a href="https://twitter.com/erikras" target="_blank">@erikras</a>
            <a className="github" href="https://github.com/erikras/react-redux-universal-hot-example" target="_blank">
              <i className="fa fa-github"/> View on Github
            </a>
          </p>
          <iframe
            src="https://ghbtns.com/github-btn.html?user=erikras&repo=react-redux-universal-hot-example&type=star&count=true&size=large"
            frameBorder="0" allowTransparency="true" scrolling="0" width="160px" height="30px"></iframe>
          <iframe
            src="https://ghbtns.com/github-btn.html?user=erikras&amp;repo=react-redux-universal-hot-example&amp;type=fork&amp;count=true&size=large"
            allowTransparency="true" frameBorder="0" scrolling="0" width="160px" height="30px"></iframe>
        </div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <ul className="nav navbar-nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/widgets">Widgets</Link></li>
              <li><Link to="/about">About Us</Link></li>
              {!user && <li><Link to="/login">Login</Link></li>}
              {user && <li className="logout-link"><a href="/logout" onClick={::this.handleLogout}>Logout</a></li>}
            </ul>
            {user && <p className="navbar-text logged-in-message">Logged in as <strong>{user.name}</strong>.</p>}
          </div>
        </nav>
        <InfoBar/>

        <div className="app-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

@connect(state => ({
  user: state.auth.user
}))
export default class AppContainer {
  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  }

  static fetchData(store) {
    const promises = [];
    if (!isInfoLoaded(store.getState())) {
      promises.push(store.dispatch(loadInfo()));
    }
    if (!isAuthLoaded(store.getState())) {
      promises.push(store.dispatch(loadAuth()));
    }
    return Promise.all(promises);
  }

  render() {
    const { user, dispatch } = this.props;
    return <App user={user} {...bindActionCreators(authActions, dispatch)}>
      {this.props.children}
    </App>;
  }
}
