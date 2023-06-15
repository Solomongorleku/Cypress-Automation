function login(username, password) {
    cy.visit("https://bloom.stage.mpharma.com/");
    cy.get("#username").type(username);
    cy.get("#password").type(password);
    cy.get("#loginButton").click();
  }
  
  Cypress.Commands.add("login", login);
  