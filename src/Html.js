import React, {Component, PropTypes} from 'react';
import serialize from 'serialize-javascript';
import DocumentMeta from 'react-document-meta';
const cdn = '//cdnjs.cloudflare.com/ajax/libs/';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.object,
    store: PropTypes.object
  }

  render() {
    const {assets, component, store} = this.props;
    const title = 'React Redux Example';
    const description = 'All the modern best practices in one example.';
    const image = 'https://react-redux.herokuapp.com/logo.jpg';
    return (
      <html lang="en-us">
        <head>
          <meta charSet="utf-8"/>
          {DocumentMeta.rewind({asReact: true})}
          <title>{title}</title>
          <meta property="og:site_name" content={title}/>
          <meta property="og:image" content={image}/>
          <meta property="og:locale" content="en_US"/>
          <meta property="og:title" content={title}/>
          <meta property="og:description" content={description}/>
          <meta name="twitter:card" content="summary"/>
          <meta property="twitter:site" content="@erikras"/>
          <meta property="twitter:creator" content="@erikras"/>
          <meta property="twitter:image" content={image}/>
          <meta property="twitter:image:width" content="200"/>
          <meta property="twitter:image:height" content="200"/>
          <meta property="twitter:title" content={title}/>
          <meta property="twitter:description" content={description}/>

          <link rel="shortcut icon" href="/favicon.ico" />
          <link href={cdn + 'twitter-bootstrap/3.3.5/css/bootstrap.css'}
                media="screen, projection" rel="stylesheet" type="text/css" />
          <link href={cdn + 'font-awesome/4.3.0/css/font-awesome.min.css'}
                media="screen, projection" rel="stylesheet" type="text/css" />

          {/* styles (will be present only in production with webpack extract text plugin) */}
          {Object.keys(assets.styles).map((style, i) =>
            <link href={assets.styles[style]} key={i} media="screen, projection"
                  rel="stylesheet" type="text/css"/>
          )}
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{__html: React.renderToString(component)}}/>
          <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} />
          <script src={assets.javascript.main}/>
        </body>
      </html>
    );
  }
}
