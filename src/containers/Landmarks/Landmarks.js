import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';
import * as landmarkActions from 'redux/modules/landmarks';
import { landmarksAreLoaded, loadLandmarks } from 'redux/modules/landmarks';
import { Error, Loader, LandmarkList } from 'components';

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
    const { landmarks } = this.props;
    const loading = !landmarks || landmarks.loading;
    const error = !landmarks || landmarks.error;
    if (loading) return (<Loader />);
    if (error) return (<Error error={error} />);
    const landmarkItems = landmarks.payload;
    if (landmarkItems && landmarkItems.length) {
      landmarkItems.sort( (first, second) => {
        if (first.title === second.title) return 0;
        return (first.title > second.title ? 1 : -1);
      });
    }
    return (
      <div>
        <DocumentMeta title="Explore the MSD"/>
        <LandmarkList items={landmarkItems} />
      </div>
    );
  }
}
