import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Navbar extends Component {
  static propTypes = {
    activeNavItem: PropTypes.string,
  }

  render() {
    const styles = require('./Navbar.scss');
    const {activeNavItem} = this.props;
    return (
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link to="/" className={activeNavItem === 'home' ? styles.active : ''}>
              <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                  <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/explore" className={activeNavItem === 'explore' ? styles.active : ''}>
              <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
              <span>Explore</span>
            </Link>
          </li>
          <li>
            <Link to="/landmark" className={activeNavItem === 'landmark' ? styles.active : ''}>
              <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
              <span>Landmark</span>
            </Link>
          </li>
          <li>
            <Link to="/more" className={activeNavItem === 'more' ? styles.active : ''}>
              <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              </svg>
              <span>More</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
