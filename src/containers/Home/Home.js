import React, {Component, PropTypes} from 'react';
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
    this.state = {
      buffering: false,
      canPlay: false,
      playing: false,
      playLoading: false,
      playLoadProg: 0,
      playPressed: false,
      videoLoopInit: false
    };

    this.video = this.video.bind(this);
    this.onCanPlayThrough = this.onCanPlayThrough.bind(this);
    this.playLoop = this.playLoop.bind(this);
    this.videoIsLoaded = this.videoIsLoaded.bind(this);
    this.videoIsPlaying = this.videoIsPlaying.bind(this);
    this.userPressedPlay = this.userPressedPlay.bind(this);
    this.tryToPlay = this.tryToPlay.bind(this);
    this.updatePlayLoadProg = this.updatePlayLoadProg.bind(this);
  }

  componentDidMount() {
    this.props.changeHeader('Explore the MSD');
    this.props.activeNavItem('home');
    this.playLoop();
  }

  onCanPlayThrough() {
    this.setState({ canPlayThrough: true });
  }

  video(domNode) {
    if (!domNode) return;
    domNode.setAttribute('webkit-playsinline', true);
    this.videoElement = domNode;
  }

  playLoop() {
    if (!this.state.videoLoopInit) this.setState({ videoLoopInit: true });

    if (this.videoIsPlaying() && this.videoIsLoaded()) {
      this.setState({ playing: true });
      return;
    }

    if (this.state.userPressedPlay) {
      this.tryToPlay();
    } else {
      setTimeout(this.playLoop, 200);
      return;
    }

    this.updatePlayLoadProg();
    setTimeout(this.playLoop, 200);

  }

  videoIsPlaying() {
    if (this.state.playing) return true;
    if (this.videoElement && !this.videoElement.paused) {
      return true;
    }
    return false;
  }

  videoIsLoaded() {
    this.updatePlayLoadProg();
    if (this.state.playLoadProg === 100) return true;
    if (this.state.canPlayThrough) return true;
    return false;
  }

  userPressedPlay() {
    this.tryToPlay();
    this.setState({ playPressed: true });
    this.playLoop();
  }

  tryToPlay() {
    if (this.videoElement) this.videoElement.play();
    this.setState({ playLoading: true });
  }

  updatePlayLoadProg() {
    const myVideo = this.videoElement;
    if (myVideo && myVideo.buffered && myVideo.buffered.length) {
      const endBuf = myVideo.buffered.end(0);
      const soFar = parseInt(((endBuf / myVideo.duration) * 100), 10);
      console.log('buffer amount: ', soFar);
      this.setState({ buffering: true, playLoadProg: soFar });
    } else {
      this.setState({ buffering: false });
    }
  }

  playButtonStyle() {
    const styles = require('./Home.scss');
    const { buffering, playLoading, playing } = this.state;
    if (playing) return [styles.playButton, styles.playing].join(' ');
    if (playLoading) {
      if (buffering) {
        return ([styles.playButton, styles.playLoading, styles.buffering].join(' '));
      }
      return ([styles.playButton, styles.playLoading].join(' '));
    }
    return styles.playButton;
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
    const { playLoadProg } = this.state;
    const playButtonStyle = this.playButtonStyle();
    const playButtonVisible = this.state.videoLoopInit ? 'visible' : 'hidden';
    return (
      <div className={styles.home}>
      <DocumentMeta {...meta} extend />
        <header className={styles.article} style={{backgroundImage: `url(${msdHero})`}}>
          <div className={styles.videoLoop}>
            <video autoPlay loop preload="auto" ref={this.video} onCanPlayThrough={this.onCanPlayThrough} poster={msdHero}>
              {
              /* chrome doesn't care about media queries
              <source src="https://s3-ap-southeast-2.amazonaws.com/explore-msd/video/flyover_sm.mp4" type="video/mp4" media="all and (max-width: 960px)" />
              <source src="https://s3-ap-southeast-2.amazonaws.com/explore-msd/video/flyover_sm.webm" type="video/webm" media="all and (max-width: 960px)" />
              */
              }
              <source src="https://s3-ap-southeast-2.amazonaws.com/explore-msd/video/flyover.mp4" type="video/mp4" />
              <source src="https://s3-ap-southeast-2.amazonaws.com/explore-msd/video/flyover.webm" type="video/webm" />
            </video>
            <button ref="playButton" className={playButtonStyle} onClick={this.userPressedPlay} style={{ 'visibility': playButtonVisible}}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" xmlSpace="preserve">
                <circle fill="rgba(0,0,0,.25)" stroke="#FFF" strokeWidth="1px" cx="50" cy="50" r="36.83" />
                <polygon className={styles.triangle} fill="none" stroke="#FFF" strokeWidth="1px" points="39.85,30.95 70.03,50 39.85,69.05 " />
                <g>
                  <path className={styles.video} fill="none" stroke="#FFF" strokeWidth="1px" d="M68.9,58.9c0,0.4-0.3,0.8-0.6,1c-0.1,0-0.3,0.1-0.4,0.1c-0.3,0-0.5-0.1-0.7-0.3L60.6,53v2.7
                    c0,2.6-2.1,4.7-4.7,4.7H37.8c-2.6,0-4.7-2.1-4.7-4.7V44.3c0-2.6,2.1-4.7,4.7-4.7h18.1c2.6,0,4.7,2.1,4.7,4.7V47l6.6-6.6
                    c0.2-0.2,0.5-0.3,0.7-0.3c0.1,0,0.3,0,0.4,0.1c0.4,0.2,0.6,0.5,0.6,1V58.9z"/>
                </g>
              </svg>
              <span className={styles.progress}>
                <span className={styles.percent}>{playLoadProg}%</span>
                <span className={styles.loading}>Loading</span>
              </span>
            </button>
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
