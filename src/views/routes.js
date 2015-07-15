import React from 'react';
import {Route} from 'react-router';
import App from 'views/App';
import Home from 'views/Home';
import Widgets from 'views/Widgets';
import About from 'views/About';
import Login from 'views/Login';

export default (
  <Route component={App}>
    <Route path="/" component={Home}/>
    <Route path="/widgets" component={Widgets}/>
    <Route path="/about" component={About}/>
    <Route path="/login" component={Login}/>
  </Route>
);
