import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {load} from 'redux/modules/info';
import {FormattedNumber, FormattedMessage, FormattedHTMLMessage, FormattedTime, FormattedDate, FormattedRelative} from 'react-intl';


@connect(
    state => ({info: state.info.data}),
    dispatch => bindActionCreators({load}, dispatch))
export default class InfoBar extends Component {
  static propTypes = {
    info: PropTypes.object,
    load: PropTypes.func.isRequired
  }

  render() {
    const {info, load} = this.props; // eslint-disable-line no-shadow
    const styles = require('./InfoBar.scss');
    const postDate = Date.now() - (1000 * 60 * 60 * 48);

    return (
      <div className={styles.infoBar + ' well'}>
        <div className="container">
          This is an info bar
          {' '}
          <strong>{info ? info.message : 'no info!'}</strong>
          <span className={styles.time}><FormattedDate value={info && new Date(info.time)} timeZoneName="long" weekday="long" hour12={false} hour="2-digit" minute="numeric" /></span>
          <button className="btn btn-primary" onClick={load}>Reload from server</button>

          <p><FormattedNumber value={99.95} style="currency" currency="USD"/></p>
          <p><FormattedRelative value={postDate} /></p>
          <p><FormattedHTMLMessage id="test.plural.ex1" values={{numComments: 42}}/></p>
          <p><FormattedMessage id="test.plural.ex2" values={{
            name: <b>Anna</b>,
            numPhotos: 1000,
            takenAgo: (
              <FormattedTime value={new Date()} hour12={false} hour="2-digit" minute="numeric" />
            )
          }}/></p>

        </div>
      </div>
    );
  }
}
