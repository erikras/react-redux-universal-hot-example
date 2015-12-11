import { createStore, applyMiddleware, compose } from 'redux';
import clientMiddleware from './middleware/clientMiddleware';
import transitionMiddleware from './middleware/transitionMiddleware';
import reducer from './modules/reducer';
import routes from '../routes';

const { reduxReactRouter } = __CLIENT__ && !__TEST__
  ? require('redux-router')
  : require('redux-router/server');

const createHistory = () => {
    if (__CLIENT__) {
        // Three different types of scroll behavior available.
        // Documented here: https://github.com/rackt/scroll-behavior
        const useScroll = require('scroll-behavior/lib/useStandardScroll');
        return useScroll(require('history/lib/createBrowserHistory'));
    }

    return require('history/lib/createMemoryHistory');
}();

const getRoutes = () => {
    if (__CLIENT__) {
        const makeRouteHooksSafe = require('../helpers/makeRouteHooksSafe');
        return makeRouteHooksSafe(routes);
    }

    return routes;
}();

function getDevUtils(enableDevTools) {
    const { persistState } = require('redux-devtools');
    const DevTools = require('../containers/DevTools/DevTools');

    return enableDevTools ? [
        window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
        persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    ] : [];
}

export default (client, data) => {
    const middleware = [clientMiddleware(client), transitionMiddleware];

    const store = compose(
        reduxReactRouter({ getRoutes, createHistory }),
        applyMiddleware(...middleware),
        ...getDevUtils(__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__)
    )(createStore)(reducer, data);

    if (__DEVELOPMENT__ && module.hot) {
        module.hot.accept('./modules/reducer', () => {
            store.replaceReducer(reducer);
        });
    }

    return store;
};
