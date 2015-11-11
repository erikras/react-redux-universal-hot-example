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
      headerTitle: 'Explore the MSD'
    };
    this.headerChangeHandler = this.headerChangeHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // if we changed routes...
    if (( nextProps.location.key !== this.props.location.key &&
      nextProps.location.state &&
      nextProps.location.state.modal
    )) {
      // save the old children (just like animation)
      this.previousChildren = this.props.children;
    }
  }

  headerChangeHandler(headerTitle) {
    this.setState({ headerTitle: headerTitle});
  }

  render() {
    const styles = require('./App.scss');
    const headerTitle = this.state.headerTitle;
    const { location } = this.props;

    const isModal = (
      location.state &&
      location.state.modal &&
      this.previousChildren
    );

    return (
      <div className={styles.app}>
        <DocumentMeta {...config.app}/>
        <div className={styles.MSDHeaderUnderlay} />
        <div className={styles.MSDHeader}>
          <Header title={ headerTitle ? headerTitle : null } />
        </div>
        <div className={styles.MSDContent}>

          {isModal ?
            this.previousChildren :
            React.cloneElement(this.props.children, {changeHeader: this.headerChangeHandler})
          }

          {isModal ? (
            <div>
              <div className={styles.modalBlanket}></div>
              <Modal isOpen returnTo={this.previousChildren.props.location.pathname}>
                { this.props.children }
              </Modal>
            </div>
          ) : '' }

        </div>
        <Navbar />
      </div>
    );
  }
}
