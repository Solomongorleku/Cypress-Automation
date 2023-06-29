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
  cy.get(".sc-cSHVUG.fPTkkZ").each(($button, index) => {
    if (index < 4) {
      cy.wrap($button).click();

      // Check if the product is out of stock
      cy.get('[style="padding-left: 8px; padding-right: 8px;"]').should(($alert) => {
        if ($alert.length > 0) {
          // Alert message is displayed, check if it's for out-of-stock or already added in cart
          const alertText = $alert.text();

          if (alertText.includes("currently unavailable at the warehouse")) {
            // Alert message for out-of-stock product
            expect(alertText).to.include("currently unavailable at the warehouse");
          } else {
            // Alert message for already added in cart, perform additional actions if needed
            // For example: expect(alertText).to.include("Already added in cart");
          }
        } else {
          // Product is in stock, perform additional actions if needed
        }
      });
    }
  });
});


