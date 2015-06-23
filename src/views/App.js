import React from 'react';
import {Link} from 'react-router';
import {load} from '../actions/infoActions';
import Stylesheet from 'react-style';
import InfoBar from '../components/InfoBar';

const styles = Stylesheet.create({
  app: {
    color: 'blue'
  }
});

export default class App {
  static fetchData(dispatch) {
    return dispatch(load());
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>React Redux Example</h1>

          <p>by <a href="https://twitter.com/erikras">@erikras</a></p>
        </div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <ul className="nav navbar-nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/sign-up">Sign Up</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </div>
        </nav>
        <InfoBar/>
        <div styles={[styles.app]}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
