import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {isLoaded as isAuthLoaded, load as loadAuth} from 'redux/modules/auth';

@connect(
  state => ({user: state.auth.user})
)
export default
class Chat extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  state = {
    message: '',
    messages: []
  };

  componentDidMount() {
    if (socket && !this.onMsgListener) {
      this.onMsgListener = socket.on('msg', this.onMessageReceived.bind(this));

      setTimeout(() => {
        socket.emit('history', {offset: 0, length: 100});
      }, 100);
    }
  }

  componentWillUnmount() {
    if (socket && this.onMsgListener) {
      socket.removeListener('on', this.onMsgListener);
      this.onMsgListener = null;
    }
  }

  onMessageReceived(data) {
    const messages = this.state.messages;
    messages.push(data);
    this.setState({messages});
  }

  static fetchData(store) {
    if (!isAuthLoaded(store.getState())) {
      return store.dispatch(loadAuth());
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const msg = this.state.message;

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
            return <li key={`chat.msg.${msg.id}`}>{msg.from}: {msg.text}</li>;
          })}
          </ul>
          <form className="login-form" onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" ref="message" placeholder="Enter your message"
             value={this.state.message}
             onChange={(event) => {
               this.setState({message: event.target.value});
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
