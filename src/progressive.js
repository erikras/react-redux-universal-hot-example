import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from './helpers/Html';

export default function () {
  return `<!doctype html>${ReactDOM.renderToStaticMarkup(<Html assets={{}} />)}`;
}
