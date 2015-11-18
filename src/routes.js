import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {
    App,
    Area,
    Home,
    Explore,
    Landmark,
    Landmarks,
    More,
    NotFound
  } from 'containers';
import { Snippet } from 'components';


export default () => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/explore" component={Explore} />
      <Route path="/explore/:area" component={Area} />
      <Route path="/landmark" component={Landmarks} />
      <Route path="/landmark/:slug" component={Landmark} />
      <Route path="/more" component={More} />
      <Route path="/snippet/:slug" component={Snippet} />
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
