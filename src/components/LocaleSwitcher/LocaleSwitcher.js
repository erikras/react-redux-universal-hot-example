import React, { Component, PropTypes } from 'react';

export default class LocaleSwitcher extends Component {

  static contextTypes = {
    location: PropTypes.object.isRequired,
    locales: PropTypes.array.isRequired,
    currentLocale: PropTypes.string.isRequired
  };

  renderLocaleLink(locale) {
    const styles = require('./LocaleSwitcher.scss');
    const {location, currentLocale} = this.context;
    const regPath = new RegExp(`^\/${currentLocale}`, 'i');
    const href = location.pathname.replace(regPath, `/${locale}`);
    let className = styles.LocalSwitcherLink;

    if (locale === currentLocale) {
      className = `${styles.LocalSwitcherLink} ${styles.LocalSwitcherLinkActive}`;
    }
    return (
      <a key={ locale }
         className={ className }
         href={href}>
          { locale }
      </a>
    );
  }

  render() {

    const styles = require('./LocaleSwitcher.scss');
    const {locales} = this.context;

    return (
      <li className={styles.LocaleSwitcher}>
        <div>
          {locales.map(this.renderLocaleLink, this) }
        </div>
      </li>
    );
  }
}
