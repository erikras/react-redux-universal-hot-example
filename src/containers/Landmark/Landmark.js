import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';
import * as landmarkActions from 'redux/modules/landmarks';
import { landmarkIsLoaded, loadLandmark } from 'redux/modules/landmarks';
import { SnippetList } from 'components';

@connect(
  state => ({
    landmark: state.landmarks.data,
    error: state.landmarks.error,
    loading: state.landmarks.loading
  }),
  {...landmarkActions})

export default
class Landmark extends Component {
  static propTypes = {
    changeHeader: PropTypes.func,
    landmark: PropTypes.object,
    loading: PropTypes.bool,
    location: PropTypes.object.isRequired
  }

  componentDidMount() {
    const headerTitle = 'Landmark';
    this.props.changeHeader(headerTitle);
  }

  static fetchDataDeferred(getState, dispatch) {
    if (!landmarkIsLoaded(getState())) {
      return dispatch(loadLandmark());
    }
  }

  render() {
    // const styles = require('./Landmark.scss');
    const { location, landmark, loading } = this.props;
    if (loading) return (<h2>Loading landmark...</h2>);
    if (!landmark) return (<h2>Unable to load landmark</h2>);
    return (
      <div>
        <DocumentMeta title="Landmark"/>
        <h1>{landmark.title}</h1>
        <p>{landmark.description}</p>
        <SnippetList items={landmark.snippets} location={location} />
      </div>
    );
  }
}
