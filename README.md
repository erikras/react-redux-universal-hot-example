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

Thanks for checking this out.

-----
Erik Rasmussen [@erikras](https://twitter.com/erikras)
