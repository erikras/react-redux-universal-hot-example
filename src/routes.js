import React from 'react';
import {Route} from 'react-router';
import {
    App,
    Chat,
    Home,
    Widgets,
    About,
    Login,
    RequireLogin,
    LoginSuccess,
    Survey,
    NotFound,
  } from 'containers';

export default (
  <Route component={App}>
    <Route path="/" component={Home}/>
    <Route path="/widgets" component={Widgets}/>
    <Route path="/about" component={About}/>
    <Route path="/login" component={Login}/>
    <Route component={RequireLogin}>
      <Route path="/chat" component={Chat}/>
      <Route path="/loginSuccess" component={LoginSuccess}/>
    </Route>
    <Route path="/survey" component={Survey}/>
    <Route path="*" component={NotFound} status={404} />
  </Route>
);
