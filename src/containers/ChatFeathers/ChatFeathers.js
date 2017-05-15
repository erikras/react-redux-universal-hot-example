import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { withApp } from 'app';
import * as chatActions from 'redux/modules/chat';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const state = getState();

    if (state.online) {
      return dispatch(chatActions.load());
    }
  }
}])
@connect(
  state => ({
    user: state.auth.user,
    messages: state.chat.messages
  }),
  { ...chatActions }
)
@withApp
export default class ChatFeathers extends Component {

  static propTypes = {
    app: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    addMessage: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired
  };

  state = {
    message: '',
    error: null
  };

  componentDidMount() {
    this.props.app.service('messages').on('created', this.props.addMessage);
  }

  componentWillUnmount() {
    this.props.app.service('messages').removeListener('created', this.props.addMessage);
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.app.service('messages').create({ text: this.state.message })
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
              type="text"
              ref={c => { this.message = c; }}
              placeholder="Enter your message"
              value={this.state.message}
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
