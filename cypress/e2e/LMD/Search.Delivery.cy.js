import { userDetailstest } from "../../fixtures/loginData";
import { searchData } from "../../fixtures/searchData"

const { username, password } = userDetailstest;
const searchValue = searchData();

let { deliveryId, receiverName } = searchValue;





describe('Search Delivery', () => {
      
    before(() => {
        cy.clearCookies()
        cy.loginLMD(username, password);
    });


    it('Search for delivery by Delivery Id', () => {
        cy.xpath('//a[normalize-space()="Go to Deliveries"]').click();
        cy.get("[data-testid='filter-searchbox']").should('be.visible').click();
        cy.get("[data-testid='filter-searchbox']").type(deliveryId)
       
        cy.intercept({
            method: "GET",
            url: "https://api.test.mpharma.com/tracking-ms/deliveries/?page=1&entity_group_id=1&delivery_receiver=GHST-8983",
          }).as("DeliveryId");
        cy.wait("@DeliveryId").then((data) => {
            expect(data.response.statusCode, "Response Status Code").to.equal(200);
        cy.get("[data-testid='close-icon']").click()  
  
      })
});
    it('Search for delivery by Receivers Name', () => {
        cy.get("[data-testid='filter-searchbox']").should('be.visible').click();
        cy.get("[data-testid='filter-searchbox']").type(receiverName)
       
        cy.intercept({
            method: "GET",
            url: "https://api.test.mpharma.com/tracking-ms/deliveries/?page=1&entity_group_id=1&delivery_receiver=Fresh",
          }).as("Receiver");
        cy.wait("@Receiver").then((data) => {
            expect(data.response.statusCode, "Response Status Code").to.equal(200);  
  
      })
});
});