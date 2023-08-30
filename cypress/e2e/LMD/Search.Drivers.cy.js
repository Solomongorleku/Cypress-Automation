import { userDetailstest } from "../../fixtures/loginData";
import { searchData } from "../../fixtures/searchData"

const { username, password } = userDetailstest;
const { url } = userDetailstest;
const searchValue = searchData();

let { firstName, lastName } = searchValue;





describe('Search Driver', () => {
      
    before(() => {
        cy.clearCookies()
        cy.loginLMD(username, password);
    });
    
    it('Search for driver by First name', () => {
        cy.get('svg[title*="Settings"]').click();
        cy.contains('Manage Drivers').click()
        cy.get("[data-testid='driver-search']").click();
        cy.get("[data-testid='driver-search']").type(firstName);
        cy.intercept({
          method: "GET",
          url: "https://api.test.mpharma.com/tracking-ms/person/?user_type=2&entity_code=610d261ed62fb30071a2267a&name=New&sort=first_name",
        }).as("Driver");
      cy.wait("@Driver").then((data) => {
          expect(data.response.statusCode, "Response Status Code").to.equal(200);  
          const searchResult = data.response.body.results;    
          const first_Name = searchResult[0].first_name
          expect(first_Name).to.be.equal(firstName);
          cy.get("[data-testid='close-icon']").click();

    })
  })
   it('Search for driver by Last name', () => {
    cy.get("[data-testid='driver-search']").click();
    cy.get("[data-testid='driver-search']").type(lastName);
    cy.intercept({
      method: "GET",
      url: "https://api.test.mpharma.com/tracking-ms/person/?user_type=2&entity_code=610d261ed62fb30071a2267a&name=Driver&sort=first_name",
    }).as("Driver");
  cy.wait("@Driver").then((data) => {
      expect(data.response.statusCode, "Response Status Code").to.equal(200);  
      const searchResult = data.response.body.results;    
      const last_Name = searchResult[0].last_name
      expect(last_Name).to.be.equal(lastName);

})
})
})
