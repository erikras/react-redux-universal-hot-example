import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Chat,
    Home,
    Widgets,
    About,
    Login,
    LoginSuccess,
    Survey,
    NotFound,
    Content,
    ContentEditor,
    ContentPage,
    Lesson,
    Lessons,
    LessonEditor,
    CreateLesson,
    HomeDev,
    MyContents,
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/login');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="chat" component={Chat}/>
        <Route path="loginSuccess" component={LoginSuccess}/>
        <Route path="account/contents" component={MyContents}/>
      </Route>

      { /* Routes */ }
      <Route path="about" component={About}/>
      <Route path="login" component={Login}/>
      <Route path="survey" component={Survey}/>
      <Route path="widgets" component={Widgets}/>
      <Route path="content/create" component={ContentEditor}/>
      <Route path="content/:id" component={Content}/>
      <Route path="content/:id/edit" component={ContentEditor}/>
      <Route path="lessons" component={Lessons}/>
      <Route path="homedev" component={HomeDev}/>
      <Route path="lesson/create" component={CreateLesson}/>
      <Route path="lesson/:id" component={Lesson}/>
      <Route path="lesson/:id/edit" component={LessonEditor}/>
      <Route path="page/:id" component={ContentPage}/>


      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
