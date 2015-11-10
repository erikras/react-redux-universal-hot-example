import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import { Image } from 'components';

export default class SnippetListItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    location: PropTypes.object
  }

  render() {
    const { location } = this.props;
    const { image, id, slug, title, teaser } = this.props.item;
    const styles = require('./SnippetListItem.scss');
    return (
      <li className={styles.snippetListItem}>
        <div className={styles.thumb}>
          <Image image={image} size="thumb" />
        </div>
        <div className={styles.cardContent}>
          <h2 className={styles.cardTitle}>
            <Link key={id} to={`/snippet/${slug}`} state={{ modal: true, returnTo: location.pathname }}>
              {title}
            </Link>
          </h2>
          <div className={styles.cardBody}>
            <p>{teaser}</p>
          </div>
        </div>
      </li>
    );
  }
}
