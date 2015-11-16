import React, {Component, PropTypes} from 'react';

export default class Header extends Component {
  static propTypes = {
    title: PropTypes.string,
  }

  static defaultProps = { title: 'Explore the MSD' }

  render() {
    const {title} = this.props; // eslint-disable-line no-shadow
    const styles = require('./Header.scss');
    const raster = require('./logo-msd.png');
    const logo = require('./logo-msd.svg');
    return (
      <header className={styles.pageHeader}>
        <div className={styles.pageHeaderLogo}>
          <svg width="214" height="100" viewBox="0 0 214 100" role="img" aria-labelledby="aria-uom-title">
            <title id="aria-uom-title">Melbourne School of Design Logo</title>
            <image xlinkHref={logo} src={raster} width="214" height="100" alt="Melbourne School of Design | The University of Melbourne" preserveAspectRatio="xMaxYMin meet" />
          </svg>
        </div>
        <div className={styles.pageHeaderTitle}>
          <h1>{title}</h1>
        </div>
        {/* <div className="page-header-tools">
          <p><a href="#">Search</a></p>
        </div> */}
      </header>
    );
  }
}