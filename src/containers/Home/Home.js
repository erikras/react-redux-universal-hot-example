import React, {Component, PropTypes} from 'react';
import DocumentMeta from 'react-document-meta';

export default class Home extends Component {
  static propTypes = {
    activeNavItem: PropTypes.func,
    changeHeader: PropTypes.func
  }

  componentDidMount() {
    this.props.changeHeader('Explore the MSD');
    this.props.activeNavItem('home');
  }

  render() {
    const styles = require('./Home.scss');
    return (
      <div className={styles.home}>
        <h1>Welcome.</h1>
        <DocumentMeta title="Welcome to the Melbourne School of Design"/>
        <p>awesome videos and a slick little introduction to what the app is.</p>
      </div>
    );
  }
}
