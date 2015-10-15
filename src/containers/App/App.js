import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import DocumentMeta from 'react-document-meta';
import { Header } from 'components';

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

// const headerTitle = 'Explore the MSD';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    history: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = {
      headerTitle: 'Explore the MSD'
    };
    this.headerChangeHandler = this.headerChangeHandler.bind(this);
  }

  headerChangeHandler(headerTitle) {
    this.setState({ headerTitle: headerTitle});
  }

  render() {
    console.log('rendering app');
    const headerTitle = this.state.headerTitle;
    const styles = require('./App.scss');
    // headerChangeHandler = this.headerChangeHandler;
    console.log(this);
    return (
      <div className={styles.app}>
        <DocumentMeta {...meta}/>
        <div className="pageHeader">
          <Header title={ headerTitle ? headerTitle : null } />
        </div>
        <div className={styles.appContent}>
          {React.cloneElement(this.props.children, {changeHeader: this.headerChangeHandler })}
        </div>
        <div className="navbar">
          <nav>
            <div>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/explore">Explore</Link></li>
                <li><Link to="/landmark">Landmark</Link></li>
                <li><Link to="/survey">Info</Link></li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}
