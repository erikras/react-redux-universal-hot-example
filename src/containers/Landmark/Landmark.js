import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { SnippetList } from 'components';

export default class Landmark extends Component {
  static propTypes = {
    changeHeader: PropTypes.func,
    children: PropTypes.object,
    location: PropTypes.object
  }

  componentDidMount() {
    const headerTitle = 'Landmark';
    this.props.changeHeader(headerTitle);
  }

  render() {
    // const styles = require('./Landmark.scss');
    const SnippetListItems = [
      {
        title: 'Snip 1',
        id: '1',
        description: 'I am a real snippet!',
        image: 'http://placeimg.com/400/300'
      },
      {
        title: 'Snippy 2',
        id: '2',
        description: 'Also a snippet. Fo real.',
        image: 'http://placeimg.com/400/300'
      },
      {
        title: 'Gobley Gookidy',
        id: '3',
        description: 'Hey hey hey I am a Gobley?!',
        image: 'http://placeimg.com/400/300'
      }
    ];
    return (
      <div>
        <h1>Landmark</h1>
        <DocumentMeta title="Landmark"/>
        <p>This is a landmark</p>
        <SnippetList items={SnippetListItems} location={location} />
      </div>
    );
  }
}
