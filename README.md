React Redux Universal Hot Example
=================================

This is a starter boiler plate app I've put together using the following technologies:

* Isomorphic/Universal rendering
* Both client and server make calls to load data from separate API server
* [React](https://github.com/facebook/react)
* [React Router](https://github.com/rackt/react-router)
* [Express](http://expressjs.com)
* [Babel](http://babeljs.io) for ES6 and ES7 magic
* [Webpack](http://webpack.github.io) for bundling
* [Webpack Dev Server](http://webpack.github.io/docs/webpack-dev-server.html)
* [React Hot Loader](https://github.com/gaearon/react-hot-loader)
* [Redux](https://github.com/gaearon/redux)'s futuristic [Flux](https://facebook.github.io/react/blog/2014/05/06/flux
.html) implementation
* [React Style](https://github.com/js-next/react-style) for inline styles

I cobbled this together from a wide variety of similar "starter" repositories. As I post this in June 2015, all of these libraries are right at the bleeding edge of web development. They may fall out of fashion as quickly as they have come into it, but I personally believe that this stack is the future of web development and will survive for several years. I'm building my new projects like this, and I recommend that you do, too.

### Running Web Server

```
npm install
npm run start
```

### Running Webpack Dev Server

```
npm run watch-client
```

Both `npm run start` and `npm run watch-client` must be running at the same time for the webapp to work with hot reloading.

### Explanation

What initally gets run is `babel.server.js`, which does little more than enable ES6 and ES7 awesomeness in the server-side node code. It then initiates `server.js`. In `server.js` we proxy any requests to `/api/*` to the API server, running at `localhost:3030`. All the data fetching calls from the client go to `/api/*`. Aside from serving the favicon and static content from `/static`, the only thing `server.js` does is initiate delegate rendering to `react-router`. At the bottom of `server.js`, we listen to port `3000` and initiate the API server.

#### Routing and HTML return

The primary section of `server.js` generates an HTML page with the contents returned by `react-router`. First we instantiate an `ApiClient`, a facade that both server and client code use to talk to the API server. On the server side, `ApiClient` is given the request object so that it can pass along the session cookie to the API server to maintain session state. We pass this API client facade to the `redux` middleware so that the action creators have access to it.

We ask `react-router` for a list of all the routes that match the current request and we check to see if any of the matched routes has a static `fetchData()` function. If it does, we pass the redux dispatcher to it and collect the promises returned. Those promises will be resolved when each matching route has loaded its necessary data from the API server.

The last interesting bit of the main routing section of `server.js` is that we swap in the Webpack Dev Server if we are running in a development environment (see: `const webserver = ...`). This will enable hot reloading of changes.

We also spit out the `redux` state into a global `window.__data__` variable in the webpage to be loaded by the client-side `redux` code.

#### Client Side

The client side entry point is reasonably named `client.js`. All it does is load the routes, initiate `react-router`, rehydrate the redux state from the `window.__data__` passed in from the server, and render the page over top of the server-rendered DOM. This makes React enable all its event listeners without having to re-render the DOM.

#### Redux Middleware

The middleware, [`clientMiddleware.js`](https://github.com/erikras/react-redux-universal-hot-example/blob/master/src/redux/clientMiddleware.js), serves two functions:

1. To allow the action creators access to the client API facade. Remember this is the same on both the client and the server, and cannot simply be `import`ed because it holds the cookie needed to maintain session on server-to-server requests.
2. To allow some actions to pass a "promise generator", a function that takes the API client and returns a promise. Such actions require three action types, the `REQUEST` action that initiates the data loading, and a `SUCCESS` and `FAILURE` action that will be fired depending on the result of the promise. There are other ways to accomplish this, some discussed [here](https://github.com/gaearon/redux/issues/99), which you may prefer, but to the author of this example, the middleware way feels cleanest.

#### API Server

This is where the meat of your server-side application goes. It doesn't have to be implemented in Node or Express at all. This is where you connect to your database and provide authentication and session management. In this example, it's just spitting out some json with the current time stamp.

Thanks for checking this out.

-----
Erik Rasmussen [@erikras](https://twitter.com/erikras)
