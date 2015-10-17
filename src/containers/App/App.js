import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { Header, Navbar } from 'components';

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
    children: PropTypes.object,
    history: PropTypes.object
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

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
    console.log('we going to render le app');
    const headerTitle = this.state.headerTitle;
    const styles = require('./App.scss');
    console.log('now we rendering le app');
    return (
      <div className={styles.app}>
        <DocumentMeta {...meta}/>
        <div className="pageHeader">
          <Header title={ headerTitle ? headerTitle : null } />
        </div>
        <div className={styles.appContent}>
          {React.cloneElement(this.props.children, {changeHeader: this.headerChangeHandler })}
        </div>
        <Navbar />
      </div>
    );
  }
}
