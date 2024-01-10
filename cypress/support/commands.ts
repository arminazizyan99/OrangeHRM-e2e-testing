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
import employeePage from "../pages/employeePage";
import { assertChainer } from "../src/models";

/**
 * Cypress command to hide command log requests for a specific page.
 * It intercepts the page load and injects a style to hide request commands in the command log.
 *
 * @param {string} pageUrl - The URL of the page to visit and intercept.
 *
 */
Cypress.Commands.add("hideCommandLogRequest", (pageUrl) => {
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
