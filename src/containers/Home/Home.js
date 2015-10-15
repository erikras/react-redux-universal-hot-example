import React, {Component, PropTypes} from 'react';
import DocumentMeta from 'react-document-meta';

export default class Home extends Component {
  static propTypes = {
    changeHeader: PropTypes.func,
  }

  componentDidMount() {
    const headerTitle = 'Homeo';
    this.props.changeHeader(headerTitle);
  }

  render() {
    // const styles = require('./Home.scss');
    return (
      <div>
        <h1>Home</h1>
        <DocumentMeta title="Home"/>
        <p>I am exploring</p>
      </div>
    );
  }
}
