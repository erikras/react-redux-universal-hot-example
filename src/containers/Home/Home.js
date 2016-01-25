import React, {Component, PropTypes} from 'react';
// import ReactDOM from 'react-dom';
import DocumentMeta from 'react-document-meta';
import { Link } from 'react-router';
import config from '../../config';

export default class Home extends Component {
  static propTypes = {
    activeNavItem: PropTypes.func,
    changeHeader: PropTypes.func
  }

  constructor() {
    super();
    // this.goFullscreen = this.goFullscreen.bind(this);
    // this.showPlayButton = this.showPlayButton.bind(this);
    this.video = this.video.bind(this);
    this.state = {playButton: 'hidden'};
  }

  componentDidMount() {
    this.props.changeHeader('Explore the MSD');
    this.props.activeNavItem('home');
  }

  // https://developer.apple.com/library/iad/documentation/UserExperience/Conceptual/iAdJSProgGuide/PlayingVideosinAds/PlayingVideosinAds.html

  // https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/ControllingMediaWithJavaScript/ControllingMediaWithJavaScript.html

  // showPlayButton() {
  //   this.setState({playButton: 'visible'});
  //   const vid = ReactDOM.findDOMNode(this.refs.video);
  //   console.log(vid.webkitSupportsFullscreen);
  //   if (vid.webkitSupportsFullscreen) {
  //     // const playButton = ReactDOM.findDOMNode(this.refs.playVideo);
  //     this.setState({playButton: 'visible'});
  //   }
  // }

  // goFullscreen() {
  //   const vid = ReactDOM.findDOMNode(this.refs.video);
  //   vid.play();
  // }

  video(domNode) {
    if (domNode) {
      domNode.setAttribute('webkit-playsinline', true);
    }
  }

  render() {
    const styles = require('./Home.scss');
    const msdHero = require('./msd.jpg');
    const meta = {
      title: 'Welcome to the Melbourne School of Design',
      meta: {
        property: {
          'og:image': config.host + msdHero,
          'og:image:width': 1400,
          'og:image:height': 934
        }
      }
    };
    const { playButton } = this.state;
    return (
      <div className={styles.home}>
      <DocumentMeta {...meta} extend />
        <header className={styles.article} style={{backgroundImage: `url(${msdHero})`}}>
          <div className={styles.videoLoop}>
            <video autoPlay="true" loop="true" preload="auto" ref={this.video}>
              {
              /* chrome doesn't care about media queries
              <source src="https://s3-ap-southeast-2.amazonaws.com/explore-msd/video/flyover_sm.mp4" type="video/mp4" media="all and (max-width: 960px)" />
              <source src="https://s3-ap-southeast-2.amazonaws.com/explore-msd/video/flyover_sm.webm" type="video/webm" media="all and (max-width: 960px)" />
              */
              }
              <source src="https://s3-ap-southeast-2.amazonaws.com/explore-msd/video/flyover.mp4" type="video/mp4" />
              <source src="https://s3-ap-southeast-2.amazonaws.com/explore-msd/video/flyover.webm" type="video/webm" />
            </video>
            <svg className={styles.playButton} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" xmlSpace="preserve">
              <circle fill="rgba(0,0,0,.1)" stroke="#FFF" strokeWidth="8px" cx="500" cy="500" r="368.3" />
              <polygon fill="none" stroke="#FFF" strokeWidth="8px" points="398.5,309.5 700.3,500 398.5,690.5 " />
            </svg>
          </div>
          <div className={styles.bottomAlign}>
            <h1>
              Welcome to the Melbourne School of Design
            </h1>
            <p>
              A living learning building, the Melbourne School of Design sets a new standard for design education in the Asia-Pacific region.
            </p>
          </div>
        </header>
        <section className={styles.lead}>
          <button style={{'visibility': playButton}} ref="playVideo" onClick={this.goFullscreen}>Go Fullscreen!</button>
          <p>
            This app is designed to enhance your experience of the MSD Building. Whether you’re at home or taking a self-guided tour, it will explain why some of the key design decisions were made, and demonstrate what makes the building unique. Tap <Link to="/explore">Explore</Link> when you’re ready to begin.
          </p>
        </section>
        <section>
          <h2 className={styles.title}>Background of the building</h2>
          <p>Prior to colonisation, this site was a wetland that belonged to the traditional owners, the Wurundjeri people. The Melbourne School of Design acknowledges the traditional owners and pays its respects to Wurundjeri elders past, present and future.</p>
          <p>The Melbourne School of Design, located at the heart of campus and handed over to the University in October 2014, is designed as a learning building – ‘Built Pedagogy’. People learn not only within classrooms but also by using the building and observing the ways that others use it.</p>
          <p>Demolition of the old Architecture building and construction of the new MSD provided opportunities for ‘living learning’ through studio classes, exhibitions, tours, photo documentation and teaching activity on and around the site.</p>
          <p>The award-winning architects were <a href="http://www.johnwardlearchitects.com/">John Wardle Architects</a> (Melbourne) and <a href="http://www.nadaaa.com/">NADAAA</a> (Boston). They collaborated on elements of the project often around the clock, working extensively with many other discipline groups to deliver the stunning Melbourne School of Design.</p>
        </section>
      </div>
    );
  }
}
