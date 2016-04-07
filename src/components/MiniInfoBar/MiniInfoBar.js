import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

function MiniInfoBar({ time }) {
  return (
    <div className="mini-info-bar">
      The info bar was last loaded at
      {' '}
      <span>{time && new Date(time).toString()}</span>
    </div>
  );
}

MiniInfoBar.propTypes = {
  time: PropTypes.number
};


export default connect(
  state => ({ time: state.info.data.time })
)(MiniInfoBar);
