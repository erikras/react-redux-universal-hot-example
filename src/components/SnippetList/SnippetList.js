import React, {Component, PropTypes} from 'react';
import {SnippetListItem} from 'components';

export default class SnippetList extends Component {
  static propTypes = {
    items: PropTypes.array
  }

  render() {
    const SnippetListItems = this.props.items.map( item =>
      <SnippetListItem key={item.key} title={item.title} description={item.description} image={item.image} />
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
