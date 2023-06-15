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

// clickNElements(byLocator, n)
//     cy.get(byLocator).should('have.length', n).each(($el, index) => {
//       if (index < n) {
//         cy.wrap($el).click()
//       }
//     })

/// <reference types="Cypress" />

/// <reference types="cypress-xpath" />

Cypress.Commands.add('addToCart', () => {
    for (let i = 1; i < 5; i++) {
        cy.get(".sc-cSHVUG.fPTkkZ").eq(i).click(); // Click the next 4 "add to cart" buttons
      
        cy.get('[style="padding-left: 8px; padding-right: 8px;"]').should("be.visible").then(($alert) => {
          const alertText = $alert.text(); // Capture the alert message text
          expect(alertText).to.include("currently unavailable at the warehouse"); // Assert the text in the alert message
        });
      }
})