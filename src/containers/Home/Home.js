import React, {Component, PropTypes} from 'react';
import DocumentMeta from 'react-document-meta';
import config from '../../config';

export default class Home extends Component {
  static propTypes = {
    activeNavItem: PropTypes.func,
    changeHeader: PropTypes.func
  }

  componentDidMount() {
    this.props.changeHeader('Explore the MSD');
    this.props.activeNavItem('home');
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
    return (
      <div className={styles.home}>
      <DocumentMeta {...meta} extend />
        <header className={styles.article} style={{backgroundImage: `url(${msdHero})`}}>
          <div className={styles.videoLoop}>
            <video autoPlay="true" loop="true" preload="auto">
              {
              /* chrome doesn't care about media queries
              <source src="https://s3-ap-southeast-2.amazonaws.com/explore-msd/video/flyover_sm.mp4" type="video/mp4" media="all and (max-width: 960px)" />
              <source src="https://s3-ap-southeast-2.amazonaws.com/explore-msd/video/flyover_sm.webm" type="video/webm" media="all and (max-width: 960px)" />
              */
              }
              <source src="https://s3-ap-southeast-2.amazonaws.com/explore-msd/video/flyover.mp4" type="video/mp4" />
              <source src="https://s3-ap-southeast-2.amazonaws.com/explore-msd/video/flyover.webm" type="video/webm" />
            </video>
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
            Vestibulum a ante vestibulum sed est scelerisque dis inceptos nullam adipiscing condimentum penatibus cursus primis adipiscing nisi vitae erat.
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
