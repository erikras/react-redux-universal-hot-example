import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(
  (state, props) => ({ notifs: state.notifs[props.namespace] || [] })
)
export default class Notifs extends Component {
  static propTypes = {
    notifs: PropTypes.array.isRequired,
    NotifComponent: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired
  };

  render() {
    const { notifs, className, NotifComponent } = this.props;

    return (
      <div className={`notif-container ${className}`}>
        {notifs.map(notif => <NotifComponent key={notif.id} message={notif.message} kind={notif.kind} />)}
      </div>
    );
  }
}
