import React, {Component, PropTypes} from 'react';
import DocumentMeta from 'react-document-meta';
import {Loader} from 'components';

export default class Home extends Component {
  static propTypes = {
    changeHeader: PropTypes.func,
  }

  componentDidMount() {
    const headerTitle = 'Explore the MSD';
    this.props.changeHeader(headerTitle);
  }

  render() {
    // const styles = require('./Home.scss');
    return (
      <div>
        <h1>Welcome.</h1>
        <DocumentMeta title="Home"/>
        <Loader/>
        <p>awesome videos and a slick little introduction to what the app is.</p>
      </div>
    );
  }
}
