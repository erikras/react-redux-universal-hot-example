import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from './helpers/Html';

module.exports = () => {
  var element = React.createElement(Html, { assets: {} });
  return '<!doctype html>' + ReactDOM.renderToStaticMarkup(<Html assets={{}} />);
}