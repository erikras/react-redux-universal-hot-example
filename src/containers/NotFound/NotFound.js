import React from 'react';
import Helmet from 'react-helmet';

export default function NotFound() {
  return (
    <div className="container">
      <Helmet title="Not Found"/>

      <h1>Doh! 404!</h1>
      <p>These are <em>not</em> the droids you are looking for!</p>
    </div>
  );
}
