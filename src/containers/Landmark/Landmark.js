import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';
import * as landmarkActions from 'redux/modules/landmarks';
import { isLoaded, load as loadLandmarks } from 'redux/modules/landmarks';
import { SnippetList } from 'components';

@connect(
  state => ({
    landmarks: state.landmarks.data,
    error: state.landmarks.error,
    loading: state.landmarks.loading
  }),
  {...landmarkActions})

export default
class Landmark extends Component {
  static propTypes = {
    changeHeader: PropTypes.func,
    landmarks: PropTypes.object,
    loading: PropTypes.bool,
    location: PropTypes.object.isRequired
  }

  componentDidMount() {
    const headerTitle = 'Landmark';
    this.props.changeHeader(headerTitle);
  }

  static fetchDataDeferred(getState, dispatch) {
    if (!isLoaded(getState())) {
      return dispatch(loadLandmarks());
    }
  }

  render() {
    // const styles = require('./Landmark.scss');
    const { location, landmarks, loading } = this.props;
    if (loading) return (<h2>Loading landmark...</h2>);
    if (!landmarks) return (<h2>Unable to load landmark</h2>);
    return (
      <div>
        <DocumentMeta title="Landmark"/>
        <h1>{landmarks.title}</h1>
        <p>{landmarks.description}</p>
        <SnippetList items={landmarks.snippets} location={location} />
      </div>
    );
  }
}
