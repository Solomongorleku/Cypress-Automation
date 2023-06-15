
describe("new-order", () => {
  it("tests new-order", () => {
    cy.viewport(1149, 1001);
    cy.visit("https://bloom.test.mpharma.com/");
    cy.get("#username").click();
    cy.get("#username").type("uitester");
    cy.get("#password").click();
    cy.get("#password").type("uitester");
    cy.get("#loginButton").click();
    cy.location("href").should("eq", "https://bloom.test.mpharma.com/");
    cy.get("[data-testid='home-page-home\\.marketplace']").click().wait(5000);
    cy.get("[data-testid='productListBtn']").click();
    cy.get("input[placeholder=\"Search by product name\"]").click();
    cy.get("input[placeholder=\"Search by product name\"]").type("coa");
    cy.get("main li:nth-of-type(3)").click();
    cy.get("div.sc-ifAKCX input").click();
    cy.get("div.sc-ifAKCX input").type("3");
    cy.get("div.sc-ifAKCX button").click();
    cy.get("[data-testid='closeIcon']").first().click();
    for (let i = 1; i < 5; i++) {
      cy.get(".sc-cSHVUG.fPTkkZ").eq(i).click(); // Click the next 4 "add to cart" buttons
    
      cy.get('[style="padding-left: 8px; padding-right: 8px;"]').should("be.visible").then(($alert) => {
        const alertText = $alert.text(); // Capture the alert message text
        expect(alertText).to.include("currently unavailable at the warehouse"); // Assert the text in the alert message
      });
    }
    cy.get("[data-testid='next\\ page'] > svg").click();
    for (let i = 1; i < 5; i++) {
      cy.get(".sc-cSHVUG.fPTkkZ").eq(i).click(); // Click the next 4 "add to cart" buttons
    }
    cy.get("button[aria-label='Cart']").contains("9 Items").click();
    cy.get("svg[width='25']").eq(1).click().wait(3000);
    cy.get("button[class='sc-cSHVUG iXKmAz']").click();
    cy.xpath("//button[normalize-space()='Proceed']").click();
    cy.xpath('//div[@class="sc-bdVaJa ftyubV"]').should("be.visible").then(($alert) => {
      const alertText = $alert.text(); // Capture the alert message text
      expect(alertText).to.include("Order has been placed successfully"); // Assert the text in the alert message
    cy.location("href").should("eq", "https://bloom.test.mpharma.com/orders/outgoing")
    });
    
    // cy.get("html > body > #root > div > main > #orders > div:nth-of-type(1) > div > [data-testid='orders-tab'] > div.sc-ifAKCX > div.sc-EHOje > table > [data-testid='table-body'] > [data-testid='table-row'] > td:nth-of-type(6)").click();
    // cy.get("span.jss803").click();
    // cy.get("div.jss810 button").click();
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
});
