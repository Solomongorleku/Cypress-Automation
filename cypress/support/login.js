function login(username, password) {
    cy.visit("https://bloom.stage.mpharma.com/");
    cy.get("#username").type(username);
    cy.get("#password").type(password);
    cy.get("#loginButton").click();
  }
  
  Cypress.Commands.add("login", login);


function loginT(username, password) {
    cy.visit("https://bloom.test.mpharma.com/");
    cy.get("#username").type(username);
    cy.get("#password").type(password);
    cy.get("#loginButton").click();
  }
  
  Cypress.Commands.add("loginT", loginT);

function loginLMD(username, password) {
    cy.visit("https://logistics.test.mpharma.com/");
    cy.findByPlaceholderText('Username').click().type(username);
    cy.get("#password").type(password);
    cy.get("#loginButton").click();
  }
  
  Cypress.Commands.add("loginLMD", loginLMD);
  