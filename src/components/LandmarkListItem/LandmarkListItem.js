import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import { Image } from 'components';

export default class LandmarkListItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  render() {
    const { image, id, slug, title, teaser } = this.props.item;
    const styles = require('./LandmarkListItem.scss');
    return (
      <li className={styles.landmarkListItem}>
        <Link key={id} to={`/landmark/${slug}`}>
          { image &&
            <div className={styles.thumb}>
              { <Image image={image} size="thumb" /> }
            </div>
          }
          <div className={styles.cardContent}>
            <h2 className={styles.cardTitle}>
              {title}
            </h2>
            <div className={styles.cardBody} dangerouslySetInnerHTML={{__html: teaser}} />
          </div>
        </Link>
      </li>
    );
  }
}
