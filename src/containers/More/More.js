import React, {Component, PropTypes} from 'react';
import DocumentMeta from 'react-document-meta';
import { SocialBar } from 'components';

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
    // const categoryList = [
    //   {
    //     id: 5,
    //     slug: 5,
    //     title: 'Sustainability',
    //     image: 'https://s3-ap-southeast-2.amazonaws.com/explore-msd-api/assets/files/000/000/001/original/solarsmall.jpg?1449624988'
    //   }
    // ];

    return (
      <div className={styles.more}>
        <DocumentMeta title="Explore the Melbourne School of Design"/>
        <section>
          <h2 className={styles.title}>Connect with us!</h2>
          <SocialBar />
          {/*
          <h2 className={styles.title}>Explore by theme</h2>
          <CategoryList items={categoryList} />
          <hr className="spacer" />
          */}
          <p>Notice anything missing? Is something not working the way it should be? Let us know by emailing <a href="mailto:abp-webmaster@unimelb.edu.au">abp-webmaster@unimelb.edu.au</a>.</p>
          <hr className="spacer" />
          <p>Visit the <a href="http://msd.unimelb.edu.au">Melbourne School of Design website</a>.</p>
          <p>Have a look at our <a href="http://msd.unimelb.edu.au/graduate-programs">Graduate Programs</a>, or our Undergraduate Degree, the <a href="http://benvs.unimelb.edu.au/">Bachelor of Environments</a>.</p>
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
