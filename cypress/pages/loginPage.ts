class loginPage {
  pageUrl = "/auth/login";
  userNameField = 'input[placeholder="Username"]';
  passwordField = 'input[placeholder="Password"]';
  loginBtn = ".orangehrm-login-button";

  login() {
    cy.get(this.userNameField).should("have.value", "").type(Cypress.env("user").username);
    cy.get(this.passwordField).should("have.value", "").type(Cypress.env("user").password);
    cy.get(this.loginBtn).click();
  }
}
module.exports = new loginPage();
