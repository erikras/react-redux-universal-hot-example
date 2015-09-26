import {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

@connect(state => ({user: state.auth.user}))
export default class RequireLogin extends Component {
  static propTypes = {
    user: PropTypes.object,
    history: PropTypes.object.isRequired
  }

  componentWillMount() {
    const {history, user} = this.props;
    if (!user) {
      setTimeout(() => {
        history.replaceState(null, '/');
      });
    }
  }

  render() {
    return this.props.children;
  }
}
