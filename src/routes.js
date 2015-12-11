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
  } from 'containers';

export default ({ dispatch, getState }) => {
    const requireLogin = (nextState, replaceState, callback) => {
        function checkAuth() {
            const { auth: { user } } = getState();

            if (!user) {
                replaceState(null, '/login');
            }

            callback();
        }

        if (isAuthLoaded(getState())) {
            checkAuth();
        } else {
            dispatch(loadAuth()).then(checkAuth);
        }
    };

  /**
   * Please keep routes in alphabetical order
   */
    return (
        <Route path="/" component={App}>
            { /* Home (main) route */ }
            <IndexRoute component={Home} />

            { /* Routes requiring login */ }
            <Route onEnter={requireLogin}>
                <Route path="chat" component={Chat} />
                <Route path="loginSuccess" component={LoginSuccess} />
            </Route>

            { /* Routes */ }
            <Route path="about" component={About} />
            <Route path="login" component={Login} />
            <Route path="survey" component={Survey} />
            <Route path="widgets" component={Widgets} />

            { /* Catch all route */ }
            <Route path="*" component={NotFound} status={404} />
        </Route>
    );
};
