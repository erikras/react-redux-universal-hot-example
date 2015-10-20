import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { Header, Navbar, Modal } from 'components';

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
    history: PropTypes.object,
    location: PropTypes.object,
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

  componentWillReceiveProps(nextProps) {
    // if we changed routes...
    console.log('nextProps is ', nextProps);
    if (( nextProps.location.key !== this.props.location.key &&
      nextProps.location.state &&
      nextProps.location.state.modal
    )) {
      // save the old children (just like animation)
      console.log('we have changed routes');
      this.previousChildren = this.props.children;
      console.log('now my prev children are ', this.previousChildren);
    }
  }

  headerChangeHandler(headerTitle) {
    this.setState({ headerTitle: headerTitle});
  }

  render() {
    const headerTitle = this.state.headerTitle;
    const styles = require('./App.scss');
    const { location } = this.props;

    const isModal = (
      location.state &&
      location.state.modal &&
      this.previousChildren
    );

    return (
      <div className={styles.app}>
        <DocumentMeta {...meta}/>
        <div className="pageHeader">
          <Header title={ headerTitle ? headerTitle : null } />
        </div>
        <div className={styles.appContent}>

          {isModal ?
            this.previousChildren :
            React.cloneElement(this.props.children, {changeHeader: this.headerChangeHandler })
          }

          {isModal && (
            <Modal isOpen returnTo={this.previousChildren.props.location.pathname}>
              { this.props.children }
            </Modal>
          )}

        </div>
        <Navbar />
      </div>
    );
  }
}
