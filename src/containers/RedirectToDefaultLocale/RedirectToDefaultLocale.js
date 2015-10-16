import {Component, PropTypes} from 'react';
import intlUtils from 'utils/intl';

export default class RedirectToDefaultLocale extends Component {

  static propTypes = {
    params: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  }

  componentWillMount() {
    const {params, history, location} = this.props;
    intlUtils.initializer(params, history, location);
  }

  render() {
    return null;
  }
}
