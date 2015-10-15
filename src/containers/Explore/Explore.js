import React, {Component, PropTypes} from 'react';
import DocumentMeta from 'react-document-meta';
// import {} from 'components';

export default class Explore extends Component {
  static propTypes = {
    changeHeader: PropTypes.func,
  }

  componentDidMount() {
    const headerTitle = 'The Bold Explorer';
    console.log('mounting explore');
    this.props.changeHeader(headerTitle);
  }

  render() {
    const styles = require('./Explore.scss');
    return (
      <div className={styles.explore}>
        <h1>Explore</h1>
        <DocumentMeta title="Explore"/>
        <p>I am exploring</p>
      </div>
    );
  }
}
