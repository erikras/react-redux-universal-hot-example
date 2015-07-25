import React, {Component, PropTypes} from 'react';
import serialize from 'serialize-javascript';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
class ContainerHTML extends Component {
  static propTypes = {
    'webpackStats': PropTypes.object,
    'componentHTML': PropTypes.string,
    'storeState': PropTypes.object
  }

  render() {
    const {webpackStats, componentHTML, storeState} = this.props;
    const cdnBase = '//cdnjs.cloudflare.com/ajax/libs/';
    return (
      <html lang="en-us">
        <head>
          <meta charSet="utf-8"/>
          <title>React Redux Universal Hot Example</title>
          <link rel="shortcut icon" href="/favicon.ico" />
          <link href={cdnBase + "twitter-bootstrap/3.3.5/css/bootstrap.css"}
                media="screen, projection" rel="stylesheet" type="text/css" />
          <link href={cdnBase + "font-awesome/4.3.0/css/font-awesome.min.css"}
                media="screen, projection" rel="stylesheet" type="text/css" />
          {webpackStats.css.files.map((css, i) =>
            <link href={css} ref={i} media="screen, projection"
                  rel="stylesheet" type="text/css"/>
          )}
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={
            {__html: componentHTML}
          } />
          <script dangerouslySetInnerHTML={
            {__html: `window.__data=${serialize(storeState)};`}
          } />
          <script src={webpackStats.script[0]} />
        </body>
      </html>
    );
  }
}
export default ContainerHTML;
