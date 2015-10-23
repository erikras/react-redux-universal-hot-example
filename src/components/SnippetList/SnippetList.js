import React, { Component, PropTypes } from 'react';
import {SnippetListItem} from 'components';

export default class SnippetList extends Component {
  static propTypes = {
    items: PropTypes.array,
    location: PropTypes.object.isRequired
  }

  render() {
    const { location } = this.props;
    const SnippetListItems = this.props.items.map( item =>
      <SnippetListItem key={item.id} item={item} location={location} />
    );
    const styles = require('./SnippetList.scss');
    return (
      <div className={styles.snippetList}>
        <ul>
          {SnippetListItems}
        </ul>
      </div>
    );
  }
}
