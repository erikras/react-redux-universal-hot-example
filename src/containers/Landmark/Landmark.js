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
    const { location } = this.props;
    const SnippetListItems = [
      {
        title: 'Snip 1',
        id: 1,
        slug: 'snip-1',
        description: 'I am a real snippet!',
        image: '/1.jpg'
      },
      {
        title: 'Snippy 2',
        id: 2,
        slug: 'snippy-2',
        description: 'Also a snippet. Fo real.',
        image: '/2.jpg'
      },
      {
        title: 'Gobley Gookidy',
        id: 3,
        slug: 'gobley-gookidy',
        description: 'Hey hey hey I am a Gobley?!',
        image: '/3.jpg'
      }
    ];
    return (
      <div>
        <DocumentMeta title="Landmark"/>
        <h1>Landmark</h1>
        <p>This is a landmark</p>
        <SnippetList items={SnippetListItems} location={location} />
      </div>
    );
  }
}
