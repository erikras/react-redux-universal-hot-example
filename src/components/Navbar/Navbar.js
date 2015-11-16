import React, {Component} from 'react';
import { Link } from 'react-router';

export default class Navbar extends Component {
  render() {
    const styles = require('./Navbar.scss');
    return (
      <div className={styles.navbar}>
        <nav>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/explore">Explore</Link></li>
              <li><Link to="/landmark">Landmark</Link></li>
              <li><Link to="/more">More</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
