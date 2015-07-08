import React from 'react';
import {Route} from 'react-router';
import App from './App';
import Home from './Home';
import SignUp from './SignUp';
import Login from './Login';

export default (
  <Route component={App}>
    <Route path="/" component={Home}/>
    <Route path="/sign-up" component={SignUp}/>
    <Route path="/login" component={Login}/>
  </Route>
);
