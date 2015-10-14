import React, {Component} from 'react';
import DocumentMeta from 'react-document-meta';
// import {} from 'components';

export default class Explore extends Component {
  constructor() {
    super();
    this.state = {
      headerTitle: 'qwerqwwer'
    };
  }

  componentWillMount() {
    this.setState({headerTitle: 'rstacruz'});
  }

  render() {
    // const styles = require('./Explore.scss');
    return (
      <div>
        <h1>Explore</h1>
        <DocumentMeta title="Explore"/>
        <p>I am exploring</p>
      </div>
    );
  }
}
