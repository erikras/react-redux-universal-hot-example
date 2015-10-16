import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import DocumentMeta from 'react-document-meta';

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
    component: PropTypes.node,
    store: PropTypes.object,
    locale: PropTypes.string,
    localeData: PropTypes.array,
    localeMessages: PropTypes.object
  }

  render() {
    const {locale, localeData, localeMessages, assets, component, store} = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';

    const data = {
      store: store.getState(),
      locale: locale,
      localeData: localeData,
      localeMessages: localeMessages
    };

    return (
      <html lang={locale}>
        <head>
          <meta charSet="utf-8"/>
          {DocumentMeta.renderAsReact()}

          <link rel="shortcut icon" href="/favicon.ico" />

          {/* styles (will be present only in production with webpack extract text plugin) */}
          {Object.keys(assets.styles).map((style, key) =>
            <link href={assets.styles[style]} key={key} media="screen, projection"
                  rel="stylesheet" type="text/css"/>
          )}
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{__html: content}}/>
          <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(data)};`}} />
          <script src={assets.javascript.main}/>
        </body>
      </html>
    );
  }
}
