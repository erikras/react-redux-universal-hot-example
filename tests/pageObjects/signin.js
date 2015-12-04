module.exports = {
  url: function() {
    return this.api.launchUrl + '/login';
  },

  elements: {
    username: 'input[type=text]',
    loginButton: 'form.login-form button',
  }

};
