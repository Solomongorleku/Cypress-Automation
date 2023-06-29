import { userDetails } from "../../fixtures/loginData";

const { username, password } = userDetails;
const { url } = userDetails;



describe('Create new order in Marketplace', () => {
      
    before(() => {
        cy.clearCookies()
    });
    
    it('logs in successfully', () => {
              cy.login(username, password);
              cy.wait(5000)
            
    })

    it('Should open Marketplace', () => {
        cy.get("[data-testid='home-page-home.marketplace']").click().wait(5000);
    });
          

    it('Should access Product list', () => {
        cy.get("[data-testid='productListBtn']").click();
    })

    it('Search for a product and add to cart', () => {
        cy.get("input[placeholder=\"Search by product name\"]").click();
        cy.get("input[placeholder=\"Search by product name\"]").type("coa");
        cy.get("main li:nth-of-type(3)").click();
        cy.get("div.sc-ifAKCX input").click();
        cy.get("div.sc-ifAKCX input").type("3");
        cy.get("div.sc-ifAKCX button").click();
        cy.get("[data-testid='closeIcon']").first().click().wait(5000);
    })

    it('Adds several products to cart', () => {
        cy.addToCart();
        cy.get("[data-testid='next\\ page'] > svg").click();
        cy.addToCart();
        cy.get("button[aria-label='Cart']").contains("9 Items");
    })

    it('Delete a product from Cart', () => {
        cy.get("button[aria-label='Cart']").click();
        cy.get("svg[width='25']").eq(1).click().wait(3000);
        cy.get("button[aria-label='Cart']").contains("8 Items");
    })

    it('Confirm order', () => {
        cy.get("button[class='sc-cSHVUG iXKmAz']").click();
        cy.xpath("//button[normalize-space()='Proceed']").click();
        cy.xpath('//div[@class="sc-bdVaJa ftyubV"]').should("be.visible").then(($alert) => {
            const alertText = $alert.text(); // Capture the alert message text
            expect(alertText).to.include("Order has been placed successfully"); // Assert the text in the alert message
        cy.location("href").should("eq", "https://bloom.stage.mpharma.com/orders/outgoing")
        
        });
    });

    it('Verify new order created', () => {
        cy.intercept({
            method: "GET",
            url: "https://api.stage.mpharma.com/orders-bff/orders?facility_id=5e4a8caded73cf0076d21df4&is_mymutti=false&is_draft=false",
          }).as("OrderId");
        cy.wait("@OrderId").then((data) => {
            expect(data.response.statusCode, "Response Status Code").to.equal(200);
            const orderNum = data.response.body.results;
              
                // Get the ordID for the first item in orderNum
            const firstOrdID = orderNum[1].human_readable_id;
              
                // Extract the numeric part of the order ID
            const numericPart = parseInt(firstOrdID.substring(3)); // Assuming the numeric part starts at index 3
              
                // Calculate the expected order ID by incrementing the numeric part by one
            const expectedOrdID = "000" + (numericPart + 1).toString().padStart(3, "0");
              
            expect(parseInt(expectedOrdID)).to.be.greaterThan(parseInt(firstOrdID));
            });
    })
})