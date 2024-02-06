// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// Alternatively you can use CommonJS syntax:
// require('./commands')

import "./commands";
import { loginPage } from "../pages/loginPage";
import { assertChainer, relativeUrl, textValue } from "../src/models";

beforeEach("log in page", () => {
  cy.session(
    "login admin page",
    () => {
      cy.visit(loginPage.pageUrl);
      cy.get(loginPage.userNameField).should(assertChainer.value, textValue.emptyText);
      cy.get(loginPage.passwordField).should(assertChainer.value, textValue.emptyText);
      loginPage.login();
      cy.url().should(assertChainer.containText, relativeUrl.logedPageUrl);
    },
    {
      cacheAcrossSpecs: true,
    }
  );
});
