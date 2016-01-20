import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import { Image } from 'components';

export default class CategorySnippetsListItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  render() {
    const { image, id, slug, title, teaser } = this.props.item;
    const extStyles = require('./../LandmarkListItem/LandmarkListItem.scss');
    return (
      <li className={extStyles.landmarkListItem}>
        <Link key={id} to={`/snippet/${slug}`} state={{title: title}}>
          { image &&
            <div className={extStyles.thumb}>
              { <Image image={image} size="thumb" /> }
            </div>
          }
          <div className={extStyles.cardContent}>
            <h2 className={extStyles.cardTitle}>
              {title}
            </h2>
            <div className={extStyles.cardBody} dangerouslySetInnerHTML={{__html: teaser}} />
          </div>
        </Link>
      </li>
    );
  }
}
