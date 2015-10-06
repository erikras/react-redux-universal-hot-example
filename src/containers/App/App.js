import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import DocumentMeta from 'react-document-meta';
import { InfoBar } from 'components';
import { pushState } from 'redux-router';
import config from '../../config';

const title = 'Explore the Melbourne School of Design';
const description = 'Find out what makes the MSD unique in the design landscape.';
const image = '';

const meta = {
  title,
  description,
  meta: {
    charSet: 'utf-8',
    property: {
      'og:site_name': title,
      'og:image': image,
      'og:locale': 'en_US',
      'og:title': title,
      'og:description': description,
      'twitter:card': 'summary',
      'twitter:site': '@msdsocial',
      'twitter:creator': '@msdsocial',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image,
      'twitter:image:width': '200',
      'twitter:image:height': '200'
    }
  }
};

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    history: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const styles = require('./App.scss');
    return (
      <div className={styles.app}>
        <DocumentMeta {...meta}/>
        <nav>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/explore">Explore</Link></li>
              <li><Link to="/landmark">Landmark</Link></li>
              <li><Link to="/more">More</Link></li>
              <li><Link to="/survey">Info</Link></li>
            </ul>
          </div>
        </nav>
        <div className={styles.appContent}>
          {this.props.children}
        </div>
        <InfoBar/>
        <footer>
          &copy; 2015
        </footer>
      </div>
    );
  }
}
