import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { SnippetList } from 'components';

export default class Landmark extends Component {
  static propTypes = {
    changeHeader: PropTypes.func,
    location: PropTypes.object.isRequired
  }

  componentDidMount() {
    const headerTitle = 'Landmark';
    this.props.changeHeader(headerTitle);
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
