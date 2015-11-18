import React, {Component, PropTypes} from 'react';
import DocumentMeta from 'react-document-meta';

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
    return (
      <div>
        <DocumentMeta title="Explore the Melbourne School of Design"/>
        <section>
          <h1>More</h1>
          <p><a href="http://msd.unimelb.edu.au">Melbourne School of Design website</a></p>
          <p><a href="http://msd.unimelb.edu.au/graduate-programs">Graduate Programs</a></p>
          <p><a href="http://benvs.unimelb.edu.au/">Bachelor of Environments</a></p>
          <p><b>Authoriser:</b> Manager, Marketing and Engagement, Faculty of Architecture, Building and Planning.</p>
          <p><b>Maintainer:</b> Web Officer, Faculty of Architecture, Building and Planning</p>
          <p>We acknowledge that the Melbourne School of Design and the Parkville campus is located on Wurundjeri land.</p>
        </section>
      </div>
    );
  }
}
