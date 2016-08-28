import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import app from 'app';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({
    user: state.auth.user,
    socketSynced: state.auth.socketSynced
  }),
  authActions
)
export default class ChatFeathers extends Component {

  static propTypes = {
    user: PropTypes.object,
    socketSynced: PropTypes.bool,
    syncSocket: PropTypes.func
  };

  state = {
    message: '',
    messages: [],
    error: null
  };

  componentDidMount() {
    const { socketSynced, syncSocket } = this.props;
    if (!socketSynced) {
      syncSocket().then(() => this.initService());
    } else {
      this.initService();
    }
  }

  componentWillUnmount() {
    app.service('messages').removeListener('created', this.onMessageReceived);
  }

  onMessageReceived = data => {
    const messages = this.state.messages;
    messages.push(data);
    this.setState({ messages });
  }

  initService = () => {
    const messageService = app.service('messages');
    // Find the last 25 messages
    messageService.find({
      query: {
        $sort: { createdAt: 1 },
        $limit: 25
      }
    }).then(page => this.setState({ messages: page.data }));
    // Listen to newly created messages
    messageService.on('created', this.onMessageReceived);
  }

  handleSubmit = event => {
    event.preventDefault();
    app.service('messages').create({ text: this.state.message })
      .then(() => this.setState({ message: '', error: false }))
      .catch(error => this.setState({ error: error.message || false }));
  }

  render() {
    const { user } = this.props;
    const { error } = this.state;

    return (
      <div className="container">
        <h1>Chat</h1>

        {user && <div>
          <ul>
            {this.state.messages.map(msg => <li key={`chat.msg.${msg.id}`}>{msg.sentBy.email}: {msg.text}</li>)}
          </ul>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <input
              type="text" ref={c => { this.message = c; }} placeholder="Enter your message" value={this.state.message}
              onChange={event => this.setState({ message: event.target.value })}
            />
            <button className="btn" onClick={this.handleSubmit}>Send</button>
            {error && <div className="text-danger">{error}</div>}
          </form>
        </div>
        }
      </div>
    );
  }
}
