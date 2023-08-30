import { userDetailstest } from "../../fixtures/loginData";

const { username, password } = userDetailstest;
const { url } = userDetailstest;




describe('Add Driver', () => {
      
    before(() => {
        cy.clearCookies()
        cy.loginLMD(username, password);
    });
    
    it('Adds a New Driver', () => {
        cy.generateRandomFirstName().then((firstName) => {
        cy.generateRandomLastName().then((lastName) => {
        cy.generateRandomPhoneNumber().then((phoneNumber) => {

        cy.get('svg[title*="Settings"]').click();
        cy.contains('Manage Drivers').click();
        cy.xpath('//button[normalize-space()="Add Driver"]').click()
        cy.get('input[placeholder="eg: John"]').click().type(firstName)
        cy.get('input[placeholder="eg: Doe"]').click().type(lastName)
        cy.get('#phoneNumber').click().type(phoneNumber)
        cy.get('input[type*="password"]').click().type('1234')
        cy.get('button.sc-bwzfXH.hODAyw').eq(1).click();
        cy.intercept({
            method: "POST",
            url: " https://api.test.mpharma.com/tracking-ms/person/",
          }).as("newDriver");
        cy.wait("@newDriver").then((data) => {
            expect(data.response.statusCode, "Response Status Code").to.equal(201);  
            const searchResult = data.response.body;    
            const first_Name = searchResult.first_name
            const last_Name = searchResult.last_name
            expect(first_Name).to.be.equal(firstName);
            expect(last_Name).to.be.equal(lastName);
        cy.reload()

        });
    });
    });
});
});
});