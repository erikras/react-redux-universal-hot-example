import React, {Component, PropTypes} from 'react';

export default class Error extends Component {
  static propTypes = {
    error: PropTypes.any.isRequired,
  }

  render() {
    const { error } = this.props;
    console.log(error);
    let description = 'An unknown error has occurred';
    if (typeof error === 'string') {
      description = error;
    } else if (typeof error === 'object' && error.hasOwnProperty('error')) {
      description = error.error;
    }

    return (
      <div>
        <h2>Error:</h2>
        {description}
      </div>
    );
  }
}
