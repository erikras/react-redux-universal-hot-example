import React, {Component, PropTypes} from 'react';
import DocumentMeta from 'react-document-meta';
import { CategoryList, SocialBar } from 'components';

export default class Home extends Component {
  static propTypes = {
    activeNavItem: PropTypes.func,
    changeHeader: PropTypes.func
  }

  componentDidMount() {
    this.props.changeHeader('Explore the MSD');
    this.props.activeNavItem('more');
  }

  render() {
    const styles = require('./More.scss');
    const categoryList = [
      {
        id: 5,
        path: '/category/5',
        title: 'Sustainability',
        image: 'https://s3-ap-southeast-2.amazonaws.com/explore-msd-api/assets/files/000/000/007/original/forrest.jpg?1449803417'
      },
      {
        id: 2,
        path: '/category/2',
        title: 'Time-lapse videos',
        image: 'https://s3-ap-southeast-2.amazonaws.com/explore-msd-api/assets/files/000/000/008/original/silverbackgroundmodel.jpg?1449812198'
      },
      {
        id: -1,
        title: 'Building Awards',
        url: 'https://msd.unimelb.edu.au/melbourne-school-design-building-awards',
        image: 'https://s3-ap-southeast-2.amazonaws.com/explore-msd-api/assets/files/000/000/070/original/award3.jpg?1456205309'
      },
      {
        id: -2,
        title: 'Media Coverage',
        url: 'https://msd.unimelb.edu.au/building-media-coverage',
        image: 'https://s3-ap-southeast-2.amazonaws.com/explore-msd-api/assets/files/000/000/069/original/magazine-colors-media-page-colorful-sm.jpg?1456191164'
      }
    ];
    return (
      <div className={styles.more}>
        <DocumentMeta title="Explore the Melbourne School of Design"/>
        <section>
          <h2 className={styles.title}>Connect with us!</h2>
          <SocialBar />
          <h2 className={[styles.title, styles.withTiltSibling].join(' ')}>
            Explore popular categories
          </h2>
          <CategoryList items={categoryList} />
          <hr className="spacer" />
          <p>Notice anything missing? Is something not working the way it should be? Let us know by emailing <a href="mailto:abp-webmaster@unimelb.edu.au">abp-webmaster@unimelb.edu.au</a>.</p>
          <hr className="spacer" />
          <p>Visit the <a href="http://msd.unimelb.edu.au">Melbourne School of Design website</a>.</p>
          <p>Have a look at our <a href="http://msd.unimelb.edu.au/graduate-programs">Graduate Programs</a>, or our Undergraduate Degree, the <a href="http://benvs.unimelb.edu.au">Bachelor of Environments</a>.</p>
          <p>
            <b>Authoriser:</b> Manager, Engagement and Marketing, Faculty of Architecture, Building and Planning.
            <br/>
            <b>Maintainer:</b> Web Development Officer, Faculty of Architecture, Building and Planning.
          </p>

          <p><b>The University of Melbourne</b><br />
          <a href="http://www.unimelb.edu.au/disclaimer/">Disclaimer &amp; Copyright</a><br />
          Phone: 13 MELB (13 6352) | International: +61 3 9035 5511<br />
          ABN: 84 002 705 224<br />
          CRICOS Provider Code: 00116K.</p>
          <p><i>We acknowledge that the Melbourne School of Design and the Parkville campus is located on Wurundjeri land.</i></p>
        </section>
      </div>
    );
  }
}
