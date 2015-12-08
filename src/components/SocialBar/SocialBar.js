import React, { Component } from 'react';

export default class SocialBar extends Component {
  render() {
    const styles = require('./SocialBar.scss');
    const facebook = require('./facebook.svg');
    const instagram = require('./instagram.svg');
    const twitter = require('./twitter.svg');
    const youtube = require('./youtube.svg');
    return (
      <div className={styles.socialBar}>
        <ul>
          <li className={styles.fb}>
            <a href="https://www.facebook.com/msdsocial">
              <img src={facebook} />
              <span className={styles.label}>Facebook</span>
            </a>
          </li>
          <li className={styles.ig}>
            <a href="https://www.instagram.com/msdsocial/">
              <img src={instagram} />
              <span className={styles.label}>Instagram</span>
            </a>
          </li>
          <li className={styles.tw}>
            <a href="https://twitter.com/msdsocial">
              <img src={twitter} />
              <span className={styles.label}>Twitter</span>
            </a>
          </li>
          <li className={styles.yt}>
            <a href="https://www.youtube.com/user/ABPUnimelb">
              <img src={youtube} />
              <span className={styles.label}>YouTube</span>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
