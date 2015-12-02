import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import DocumentMeta from 'react-document-meta';
import config from '../config';

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
    store: PropTypes.object
  }

  render() {
    const {assets, component, store} = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const comment = '<!--[if lt IE 9]><script src="//oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script><![endif]-->';
    const ga = (process.env.NODE_ENV === 'production') ? 'UA-547495-15' : 'UA-547495-16';
    return (
      <html lang="en-us">
        <head>
          <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" href="/favicon.png" />
          {DocumentMeta.renderAsReact()}
          <meta charSet="utf-8" />
          <meta content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="apple-mobile-web-app-title" content="Explore MSD" />
          <link rel="apple-touch-icon" sizes="152x152" href="apple-touch-icon.png" />
          <meta name="react-comment-hack" dangerouslySetInnerHTML={{__html: comment}}></meta>
          {/* styles (will be present only in production with webpack extract text plugin) */}
          {Object.keys(assets.styles).map((style, key) =>
            <link href={process.env.NODE_ENV === 'production' ? '//' + config.cloudfrontDistribution + assets.styles[style] : assets.styles[style]} key={key} rel="stylesheet" type="text/css" />
          )}

          {/* (will be present only in development mode) */}
          {/* outputs a <style/> tag with all bootstrap styles + App.scss + it could be CurrentPage.scss. */}
          {/* can smoothen the initial style flash (flicker) on page load in development mode. */}
          {/* ideally one could also include here the style for the current page (Home.scss, About.scss, etc) */}
          { Object.keys(assets.styles).length === 0 ? <style dangerouslySetInnerHTML={{__html: require('../theme/bootstrap.config.js') + require('../containers/App/App.scss')._style}}/> : null }
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{__html: content}}/>
          <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} charSet="UTF-8"/>
          <script src={process.env.NODE_ENV === 'production' ? '//' + config.cloudfrontDistribution + assets.javascript.main : assets.javascript.main} charSet="UTF-8"/>
          {/* webfonts */}
          <script src="https://use.typekit.net/fpp4zlv.js"></script>
          <script dangerouslySetInnerHTML={{__html: "try{Typekit.load({ async: true });}catch(e){}"}} />
          <script dangerouslySetInnerHTML={{__html: "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga'); ga('create', '" + ga + "', 'auto'); ga('send', 'pageview');"}} />
        </body>
      </html>
    );
  }
}
