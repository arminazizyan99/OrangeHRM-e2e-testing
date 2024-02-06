// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// cypress/support/commands.ts

import { employeePage } from "../pages/employeePage";
import { assertChainer } from "../src/models";
import { passwordPage } from "../pages/passwordPage";

/**
 * Cypress command to hide command log requests for a specific page.
 * It intercepts the page load and injects a style to hide request commands in the command log.
 *
 * @param {string} pageUrl - The URL of the page to visit and intercept.
 *
 */
Cypress.Commands.add("hideCommandLogRequest", (pageUrl: string) => {
  cy.intercept(`${Cypress.config().baseUrl}${pageUrl}`).as("pageload");
  const app = window.top;
  if (!app.document.head.querySelector("[data-hide-command-log-request]")) {
    const style = app.document.createElement("style");
    style.innerHTML = ".command-name-request, .command-name-xhr { display: none }";
    style.setAttribute("data-hide-command-log-request", "");

    app.document.head.appendChild(style);
  }
  cy.visit(`${Cypress.config().baseUrl}${pageUrl}`);
  cy.wait("@pageload");
});


/**
 * Verify Personal detail page fields to have correct employee credentials
 *
 * @param {[]} value - array of user data field values
 *
 */
Cypress.Commands.add("checkPersonDetailsPage", (value: []) => {
  const my_arr = [
    [employeePage.titleOfDetailsPage, assertChainer.haveText],
    [employeePage.firstNameField, assertChainer.value],
    [employeePage.middleNameField, assertChainer.value],
    [employeePage.lastNameField, assertChainer.value],
    [employeePage.searchByID, assertChainer.value],
  ];

  for (let i in my_arr) {
    cy.get(my_arr[i][0]).should(my_arr[i][1], value[i]);
  }
});


/**
 * Deletes an employee using the provided employee number.
 *
 * @param {number} empNumber - The employee number of the employee to be deleted.
 *
 */
Cypress.Commands.add("deleteEmployee", (empNumber: number, userApiUrl: string) => {
  cy.request({
    method: "DELETE",
    url: userApiUrl,
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      ids: [empNumber],
    },
    //failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.equal(200);
  });
});


/**
 * Set a password using Cypress tasks and check an API call for validity.
 *
 * @param {string} password - The password to set.
 * @param {string} isValid - The expected validity status ('valid' or 'less then 7 chars' or 'number is missing'
 * or 'chars is less than 7 and number is missing').
 *
 *
 */

Cypress.Commands.add("setPasswordPerformValidationApiCall", (password: string, isValid: string) => {
  cy.intercept("POST", passwordPage.passwordAPI).as("passwordAPI");
  cy.get(passwordPage.passwordField).each((passwordField) => {
    cy.wrap(passwordField).type(password);
  });
  cy.task("setValidPassword", password);

  cy.wait("@passwordAPI")
    .its("response")
    .then((response) => {
      expect(response.body.data).to.exist;
      const { data } = response.body;
      const { messages } = data;
      if (isValid == "valid") {
        expect(response.statusCode).to.eq(200);
        expect(messages).to.be.empty;
      } else if (isValid == "less then 7 chars") {
        expect(response.statusCode).to.eq(200);
        expect(messages).to.be.have.contain("Should have at least 7 characters");
      } else if (isValid == "number is missing") {
        expect(response.statusCode).to.eq(200);
        expect(messages).to.be.have.contain("Your password must contain minimum 1 number");
      } else if (isValid == "chars is less than 7 and number is missing") {
        expect(response.statusCode).to.eq(200);
        expect(messages).to.be.have.contain("Your password must contain minimum 1 number");
        expect(messages).to.be.have.contain("Should have at least 7 characters");
      }
    });
});
