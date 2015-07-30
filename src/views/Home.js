import React, {Component} from 'react';
import path from 'path';
import CounterButton from '../components/CounterButton';
import GithubButton from '../components/GithubButton';
import {relativeToSrc, requireServerImage} from '../util';

const styles = (function getStyle() {
  if (__CLIENT__) {
    return require('./Home.scss');
  }
  const stats = require('../../webpack-stats.json');
  return stats.css.modules[relativeToSrc(path.resolve(__dirname, './Home.scss'))];
})();

// require the logo image both from client and server
let logoImage = ''
if(__CLIENT__) {
  logoImage = require('./logo.png');
} else {
  logoImage = requireServerImage('./logo.png');
}

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.masthead}>
          <div className="container">
            <div className={styles.logo}>
              <p>
                <img src={logoImage}/>
              </p>
            </div>
            <h1>React Redux Example</h1>

            <h2>All the modern best practices in one example.</h2>

            <p>
              <a className={styles.github} href="https://github.com/erikras/react-redux-universal-hot-example"
                 target="_blank">
                <i className="fa fa-github"/> View on Github
              </a>
            </p>
            <GithubButton user="erikras"
                          repo="react-redux-universal-hot-example"
                          type="star"
                          width={160}
                          height={30}
                          count large/>
            <GithubButton user="erikras"
                          repo="react-redux-universal-hot-example"
                          type="fork"
                          width={160}
                          height={30}
                          count large/>

            <p className={styles.humility}>
              Created and maintained by <a href="https://twitter.com/erikras" target="_blank">@erikras</a>.
            </p>
          </div>
        </div>

        <div className="container">
          <div className={styles.counterContainer}>
            <CounterButton/>
          </div>

          <p>This starter boilerplate app uses the following technologies:</p>

          <ul>
            <li>
              <del>Isomorphic</del>
              {' '}
              <a href="https://medium.com/@mjackson/universal-javascript-4761051b7ae9">Universal</a> rendering
            </li>
            <li>Both client and server make calls to load data from separate API server</li>
            <li><a href="https://github.com/facebook/react" target="_blank">React</a></li>
            <li><a href="https://github.com/rackt/react-router" target="_blank">React Router</a></li>
            <li><a href="http://expressjs.com" target="_blank">Express</a></li>
            <li><a href="http://babeljs.io" target="_blank">Babel</a> for ES6 and ES7 magic</li>
            <li><a href="http://webpack.github.io" target="_blank">Webpack</a> for bundling</li>
            <li><a href="http://webpack.github.io/docs/webpack-dev-server.html" target="_blank">Webpack Dev Server</a>
            </li>
            <li><a href="https://github.com/gaearon/react-hot-loader" target="_blank">React Hot Loader</a></li>
            <li><a href="https://github.com/gaearon/redux" target="_blank">Redux</a>'s futuristic <a
              href="https://facebook.github.io/react/blog/2014/05/06/flux.html" target="_blank">Flux</a> implementation
            </li>
            <li><a href="https://github.com/gaearon/redux-devtools" target="_blank">Redux Dev Tools</a> for next
              generation DX (developer experience).
              Watch <a href="https://www.youtube.com/watch?v=xsSnOQynTHs" target="_blank">Dan Abramov's talk</a>.
            </li>
            <li><a href="https://github.com/webpack/style-loader" target="_blank">style-loader</a> and <a
              href="https://github.com/jtangelder/sass-loader" target="_blank">sass-loader</a> to allow import of
              stylesheets
            </li>
          </ul>

          <h3>From the author</h3>
          <p>
            I cobbled this together from a wide variety of similar "starter" repositories. As I post this in June 2015,
            all of these libraries are right at the bleeding edge of web development. They may fall out of fashion as
            quickly as they have come into it, but I personally believe that this stack is the future of web development
            and will survive for several years. I'm building my new projects like this, and I recommend that you do,
            too.
          </p>
          <p>Thanks for taking the time to check this out.</p>
          <p>– Erik Rasmussen</p>
        </div>
      </div>
    );
  }
}
