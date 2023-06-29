
import { userDetailstest } from "../../fixtures/loginData";

const { username, password } = userDetailstest;
const { url } = userDetailstest;



describe('Save order as Draft', () => {
  let cntDft;
      
    before(() => {
        cy.clearCookies()
    });
    
    it('logs in successfully', () => {
        cy.loginT(username, password);
        cy.wait(5000) 
    })

    it('Should open Marketplace', () => {
        cy.get("[data-testid='home-page-home.marketplace']").click();
        cy.intercept({
          method: "GET",
          url: "https://api.test.mpharma.com/orders-bff/orders?facility_id=5e5e3ba59c070e004ee55184&is_mymutti=false&is_draft=true&is_pos=false",
        }).as("draftId");
        cy.wait("@draftId").then((data) => {
          expect(data.response.statusCode, "Response Status Code").to.equal(200);
          const DraftNum = data.response.body.count;
          cntDft = DraftNum
          cy.log(cntDft)
        })   
    })

    it('Should access Product list', () => {
        cy.get("[data-testid='productListBtn']").click();
    })

    it('Adds several products to cart', () => {
        cy.addToCart();
        cy.get("[data-testid='next\\ page'] > svg").click();
        cy.addToCart();
        cy.get("button[aria-label='Cart']").contains("8 Items");
    })

    it('Saves as Draft', () => {
        cy.get("button[aria-label='Cart']").click().wait(3000);
        cy.xpath("//button[normalize-space()='Save as draft']").click();
        cy.xpath("//button[@data-testid='quantityDisclaimerModalConfirm']").click();
        cy.xpath('//div[@class="sc-bdVaJa ftyubV"]').should("be.visible").then(($alert) => {
            const alertText = $alert.text(); // Capture the alert message text
            expect(alertText).to.include("Order has been saved to draft successfully"); // Assert the text in the alert message
        cy.location("href").should("eq", "https://bloom.test.mpharma.com/orders/drafts")
        
        })
    })

    it('Verify count increases when new draft is saved', () => {
      cy.intercept({
        method: "GET",
        url: "https://api.test.mpharma.com/orders-bff/orders?facility_id=5e5e3ba59c070e004ee55184&is_mymutti=false&is_draft=true&is_pos=false",
      }).as("draftId");
      cy.wait("@draftId").then((data) => {
        expect(data.response.statusCode, "Response Status Code").to.equal(200);
        const updatedCount = data.response.body.count;
        expect(updatedCount).to.equal(cntDft + 1);
      });  
    
    });   
})
