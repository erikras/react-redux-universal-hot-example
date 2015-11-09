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
        <div className={styles.thumb}>
          { <Image image={image} size="thumb" /> }
        </div>
        <div>
          <h2>
            <Link key={id} to={`/landmark/${slug}`}>
              {title}
            </Link>
          </h2>
          <p>{teaser}</p>
        </div>
      </li>
    );
  }
}
