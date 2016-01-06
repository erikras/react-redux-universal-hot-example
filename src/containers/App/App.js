import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { Header, Navbar, Modal } from 'components';
import config from '../../config';

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
      headerTitle: 'Explore the MSD',
      activeNavItem: null,
      searchOpen: false
    };
    this.headerChangeHandler = this.headerChangeHandler.bind(this);
    this.navChangeHandler = this.navChangeHandler.bind(this);
    this.searchOpenHandler = this.searchOpenHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // if we changed routes...
    if (nextProps.location.key !== this.props.location.key) {
      if (nextProps.location.state && nextProps.location.state.modal) {
        // modal magic
        // save the old children (just like animation)
        this.previousChildren = this.props.children;
      }
    }
  }

  headerChangeHandler(headerTitle) {
    this.setState({ headerTitle: headerTitle});
  }

  navChangeHandler(itemName) {
    this.setState({ activeNavItem: itemName});
  }

  searchOpenHandler(isOpen) {
    isOpen ? this.setState({ searchOpen: true}) : this.setState({ searchOpen: false}); // eslint-disable-line no-unused-expressions
  }

  render() {
    const styles = require('./App.scss');
    const { activeNavItem, headerTitle, searchOpen } = this.state;
    const { location } = this.props;
    const isModal = (
      location.state &&
      location.state.modal &&
      this.previousChildren
    );
    const appClasses = [styles.app];
    if (isModal) appClasses.push(styles.modalOpen);
    if (searchOpen) appClasses.push(styles.searchOpen);

    return (
      <div className={appClasses.join(' ')}>
        <DocumentMeta {...config.app} />
        <div className={styles.MSDHeaderUnderlay} />
        <div className={styles.MSDHeader}>
          <Header title={ headerTitle ? headerTitle : null } location={location} searchOpen={this.searchOpenHandler} />
        </div>
        <div className={styles.MSDContent}>

          {isModal ?
            this.previousChildren :
            React.cloneElement(this.props.children, {changeHeader: this.headerChangeHandler, activeNavItem: this.navChangeHandler})
          }

          {isModal && (
            <div>
              <div className={styles.modalBlanket}></div>
              <Modal isOpen returnTo={this.previousChildren.props.location.pathname}>
                { this.props.children }
              </Modal>
            </div>
          ) }

        </div>
        <Navbar activeNavItem={ activeNavItem ? activeNavItem : null } />
      </div>
    );
  }
}
