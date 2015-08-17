import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';

export const siteName = 'React Redux Example';
export const twitterAccount = '@erikras';

@connect(state => ({ title: state.apptitle.title,
                    description: state.apptitle.description,
                    image: state.apptitle.image}))
export default class AppTitle extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string
  }

  render() {
    const {title, description, image} = this.props;
    const meta = [
      // ogp.me settings
      {property: 'og:site_name', content: siteName},
      {property: 'og:image', content: image},
      {property: 'og:locale', content: 'en_US'},
      {property: 'og:title', content: title},
      {property: 'og:description', content: description},
      // twitter settings
      {name: 'twitter:card', content: 'summary'},
      {property: 'twitter:site', content: twitterAccount},
      {property: 'twitter:creator', content: twitterAccount},
      {property: 'twitter:image', content: image},
      {property: 'twitter:image:width', content: '200'},
      {property: 'twitter:image:height', content: '200'},
      {property: 'twitter:title', content: title},
      {property: 'twitter:description', content: description}
    ];

    return (
        <Helmet
            title={title}
            titleTemplate={`%s - ${siteName}`}
            meta={meta}
        />
    );
  }
}
