
module.exports = {
  'user can signin': function (browser) {
    const home = browser.page.home();
    const signin = browser.page.signin();

    home.navigate();
    home.expect.element('@login').to.be.visible;
    home.click('@login');

    // use the signin PageObject from this point to keep
    // the tests sane
    signin.expect.element('@loginButton').to.be.visible;
    signin
      .setValue('@username', 'someUsername')
      .click('@loginButton')
      .assert.containsText('body', 'Hi, someUsername');

    browser.end();
  }
};
