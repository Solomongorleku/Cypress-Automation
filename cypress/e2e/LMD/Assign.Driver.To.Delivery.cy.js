import { userDetailstest } from "../../fixtures/loginData";
import { searchData } from "../../fixtures/searchData"

const { username, password } = userDetailstest;
const searchValue = searchData();

let { driver } = searchValue;



describe('Assign Driver to Delivery', () => {
      
    before(() => {
        cy.clearCookies()
        cy.loginLMD(username, password);
    });


    it('Assign Driver to Delivery', () => {
        cy.xpath('//a[normalize-space()="Go to Deliveries"]').click();
        cy.findByText('Filter by status').click()
        cy.findAllByText('Assign Driver').eq(0).click()
        cy.get('tr[data-testid="table-row"]').eq(0).click();
        cy.xpath('//button[normalize-space()="Assign a driver"]').click()
        cy.xpath('//input[@placeholder="Search for Driver"]').click().type(driver)
        cy.contains('User Test').click()
        cy.xpath('//button[normalize-space()="Continue"]').click()
        cy.xpath('//button[normalize-space()="Assign Selected"]').click()
        cy.intercept({
            method: "POST",
            url: " **/tracking-ms/deliveries/*/assign-driver/",
          }).as("assignDriver");
        cy.wait("@assignDriver").then((data) => {
            expect(data.response.statusCode, "Response Status Code").to.equal(200);  
            const driverFirstName = data.response.body.results.driver.first_name;
            const driverLastName = data.response.body.results.driver.last_name;
            expect(driverFirstName).to.equal('User');
            expect(driverLastName).to.equal('Test');
        });
    });
});