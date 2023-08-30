import { userDetailstest } from "../../fixtures/loginData";

const { username, password } = userDetailstest;
const { url } = userDetailstest;




describe('Deactivate Driver', () => {
      
    before(() => {
        cy.clearCookies()
        cy.loginLMD(username, password);
    });
    
    it('Deactivates a New Driver', () => {
        cy.generateRandomFirstName().then((firstName) => {
        cy.generateRandomLastName().then((lastName) => {
        cy.generateRandomPhoneNumber().then((phoneNumber) => {

        cy.get('svg[title*="Settings"]').click();
        cy.contains('Manage Drivers').click();
        cy.findAllByText('Active').first().click()
        cy.get('svg[class*="MuiSvgIcon-root"]').eq(4).click();
        cy.findByText('Deactivate Driver').click()
        });
    });
});
});
});