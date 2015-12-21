import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';
import * as landmarkActions from 'redux/modules/landmarks';
import { landmarksAreLoaded, loadLandmarks } from 'redux/modules/landmarks';
import { Error, PaperLoader, LandmarkList, LandmarkSearch } from 'components';

@connect(
  state => ({
    landmarks: state.landmarks.ALL,
  }),
  {...landmarkActions})

export default
class Landmarks extends Component {
  static propTypes = {
    activeNavItem: PropTypes.func,
    changeHeader: PropTypes.func,
    landmarks: PropTypes.object,
    location: PropTypes.object,
    params: PropTypes.object
  }

  componentDidMount() {
    this.props.changeHeader('All landmarks');
    this.props.activeNavItem('landmark');
  }

  static fetchDataDeferred(getState, dispatch) {
    if (!landmarksAreLoaded(getState())) {
      return dispatch(loadLandmarks());
    }
  }

  render() {
    const styles = require('./Landmarks.scss');
    const { landmarks } = this.props;
    const loading = !landmarks.hasOwnProperty('loading') || landmarks.loading;
    const error = !landmarks || landmarks.error;
    if (error) return (<Error error={error} />);
    let landmarkItems = [];
    if (!loading) {
      landmarkItems = landmarks.payload;
      if (landmarkItems && landmarkItems.length) {
        landmarkItems.sort( (first, second) => {
          if (first.title === second.title) return 0;
          return (first.title > second.title ? 1 : -1);
        });
      }
    }
    return (
      <div>
        <DocumentMeta title="Explore the MSD" extend/>
        <h2 className={styles.title}>Search for a Landmark</h2>
        <LandmarkSearch />
        <h2 className={[styles.title, styles.withTiltSibling].join(' ')}>
          Or look through all landmarks
        </h2>
        { loading ? <PaperLoader /> : <LandmarkList items={landmarkItems} /> }
      </div>
    );
  }
}
