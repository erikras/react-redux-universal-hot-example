import React, {Component} from 'react';

export default class PaperLoader extends Component {
  render() {
    const styles = require('./PaperLoader.scss');
    return (

<div className={styles.loader}>
  <span>Loading...</span>
  <div className={styles.cube}>
  </div>
</div>
    );
  }
}
