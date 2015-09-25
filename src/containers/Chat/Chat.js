import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {isLoaded as isAuthLoaded, load as loadAuth} from 'redux/modules/auth';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({user: state.auth.user}),
  dispatch => bindActionCreators(authActions, dispatch)
)
export default
class Chat extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  componentDidMount() {
    if (socket && !this.onMsgListener) {
      this.onMsgListener = socket.on('msg', (data) => {
        console.log(data);

        const messages = this.state.messages;
        messages.push(data);
        this.setState({messages});
      });
    }
  }

  componentWillUnmount() {
    if (socket && this.onMsgListener) {
      socket.removeListener('on', this.onMsgListener);
      this.onMsgListener = null;
    }
  }

  static fetchData(store) {
    if (!isAuthLoaded(store.getState())) {
      return store.dispatch(loadAuth());
    }
  }

  state = {
    message: '',
    messages: []
  };

  handleSubmit(e) {
    e.preventDefault();

    const msg = this.state.message;
    console.log(msg);

    this.setState({message: ''});

    socket.emit('msg', {
      from: this.props.user.name,
      text: msg
    });
  }

  render() {
    const style = require('./Chat.scss');
    const {user} = this.props;

    return (
      <div className={style.chat + ' container'}>
        <h1 className={style}>Chat</h1>

        {user &&
        <div>
          <ul>
          {this.state.messages.map((msg) => {
            return <li>{msg.from}: {msg.text}</li>;
          })}
          </ul>
          <form className="login-form" onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" ref="message" placeholder="Enter your message"
             value={this.state.message}
             onChange={(e) => {
               this.setState({message: e.target.value});
             }
            }/>
            <button className="btn" onClick={this.handleSubmit.bind(this)}>Send</button>
          </form>
        </div>
        }
      </div>
    );
  }
}
