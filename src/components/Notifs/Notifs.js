import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(
  state => ({ notifs: state.notifs }), // TODO namespace with props ?
  {}
)
export default class Notifs extends Component {
  static propTypes = {
    notifs: PropTypes.object.isRequired,
    namespace: PropTypes.string.isRequired,
    NotifComponent: PropTypes.func.isRequired,
    className: PropTypes.string
  };

  render() {
    const { notifs, namespace, className, NotifComponent } = this.props;

    return (
      <div className={`notif-container ${className}`}>
        {(notifs[namespace] || []).map(notif =>
          <NotifComponent key={notif.id} message={notif.message} kind={notif.kind} />
        )}
      </div>
    );
  }
}
