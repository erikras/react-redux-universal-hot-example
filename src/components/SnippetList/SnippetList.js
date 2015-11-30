import React, { Component, PropTypes } from 'react';
import {PaperLoader, SnippetListItem} from 'components';

export default class SnippetList extends Component {
  static propTypes = {
    items: PropTypes.array,
    location: PropTypes.object
  }

  render() {
    const styles = require('./SnippetList.scss');
    const { items, location } = this.props;
    if (!items) return ( <PaperLoader /> );
    const SnippetListItems = items.map( item =>
      <SnippetListItem key={item.id} item={item} location={location} />
    );
    return (
      <div className={styles.snippetList}>
        <ul>
          {SnippetListItems}
        </ul>
      </div>
    );
  }
}
