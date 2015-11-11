import React, {Component} from 'react';

export default class Loader extends Component {
  render() {
    const styles = require('./Loader.scss');
    return (
      <div className={styles.loader}>
        <span>Loading...</span>
        <div className={styles.cube} />
      </div>
    );
  }
}
