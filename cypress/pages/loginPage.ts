class LoginPage {
  pageUrl = "/auth/login";
  userNameField = 'input[placeholder="Username"]';
  passwordField = 'input[placeholder="Password"]';
  loginBtn = ".orangehrm-login-button";

  login() {
    const username = Cypress.env("username");
    const password = Cypress.env("password");

    cy.get(this.userNameField).type(username);
    cy.get(this.passwordField).type(password);
    cy.get(this.loginBtn).click();
  }
}
module.exports = new LoginPage();
