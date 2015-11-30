import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';
import * as areaActions from 'redux/modules/areas';
import { areaIsLoaded, loadArea } from 'redux/modules/areas';
import { Error, Image, PaperLoader, LandmarkList } from 'components';

@connect(
  state => ({
    areas: state.areas,
  }),
  {...areaActions})

export default
class Area extends Component {
  static propTypes = {
    changeHeader: PropTypes.func,
    areas: PropTypes.object,
    location: PropTypes.object,
    params: PropTypes.object,
    title: PropTypes.string
  }

  componentDidMount() {
    const headerTitle = 'Explore an area';
    this.props.changeHeader(headerTitle);
    //
    // TODO: store the snippets in the state
    //
  }

  static fetchDataDeferred(getState, dispatch) {
    const state = getState();
    const areaId = state.router.params.area;
    if (!areaIsLoaded(state, areaId)) {
      return dispatch(loadArea(areaId));
    }
  }

  render() {
    const styles = require('./Area.scss');
    const areaId = this.props.params.area;
    const areaItem = this.props.areas[areaId];
    const loading = !areaItem || areaItem.loading;
    const error = !areaItem || areaItem.error;
    if (loading) return (<PaperLoader />);
    if (error) return (<Error error={error} />);
    const { description, image, landmarks, teaser, title } = areaItem.payload;
    const meta = {
      title: title,
      description: teaser,
      meta: {
        property: {
          'og:image': image.large.src,
          'twitter:image': image.medium.src,
          'twitter:image:width': image.medium.width,
          'twitter:image:height': image.medium.height,
          'twitter:description': teaser
        }
      }
    };
    return (
      <div className={styles.area}>
        <DocumentMeta {...meta} extend />
        <div className={styles.breadcrumb}>
          <Link to="/explore">← Back to all areas</Link>
        </div>
        { description && image ?
          <div className={styles.description}>
          <Image image={image} size="small" />
          <div dangerouslySetInnerHTML={{__html: description}} />
        </div>
        : '' }
        <h2>{title}’s Landmarks</h2>
        {/* <div className={styles.description}>
          { image && <Image image={image} size="small" /> }
          <div dangerouslySetInnerHTML={{__html: description}} />
        </div> */}
        {
          landmarks.length ?
          <LandmarkList items={landmarks} />
          : <p>No landmarks for {title} yet.</p>
        }
      </div>
    );
  }
}
