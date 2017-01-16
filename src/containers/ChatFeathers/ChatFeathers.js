import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import app from 'app';
import * as chatActions from 'redux/modules/chat';

@asyncConnect([{
  promise: ({ store: { dispatch } }) => dispatch(chatActions.load())
}])
@connect(
  state => ({
    user: state.auth.user,
    messages: state.chat.messages
  }),
  { ...chatActions }
)
export default class ChatFeathers extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    addMessage: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired
  };

  state = {
    message: '',
    error: null
  };

  componentDidMount() {
    app.service('messages').on('created', this.props.addMessage);
  }

  componentWillUnmount() {
    app.service('messages').removeListener('created', this.props.addMessage);
  }

  handleSubmit = event => {
    event.preventDefault();
    app.service('messages').create({ text: this.state.message })
      .then(() => this.setState({ message: '', error: false }))
      .catch(error => {
        console.log(error);
        this.setState({ error: error.message || false });
      });
  }

  render() {
    const { user, messages } = this.props;
    const { error } = this.state;

    return (
      <div className="container">
        <h1>Chat</h1>

        {user && <div>
          <ul>
            {messages.map(msg => <li key={`chat.msg.${msg._id}`}>{msg.sentBy.email}: {msg.text}</li>)}
          </ul>
          <form onSubmit={this.handleSubmit}>
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
