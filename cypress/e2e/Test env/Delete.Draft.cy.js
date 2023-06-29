import { userDetailstest } from "../../fixtures/loginData";

const { username, password } = userDetailstest;
const { url } = userDetailstest;



describe('Delete Draft', () => {
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

    it('Opens drafts', () => {
        cy.xpath('//body//div[@id="root"]//div[@id="orders"]//div//div//div//div//div//div[1]//div[1]//div[1]//button[3]//span[1]//span[1]//span[1]//div[1]').click();
        cy.wait(5000) 
    })

    it('Clicks on a saved draft', () => {
        cy.xpath('//tbody/tr[1]').click();
        cy.wait(5000) 
    })

    it('Deletes Draft', () => {
        cy.xpath("//button[normalize-space()='Delete draft']").click();
        cy.xpath("//button[normalize-space()='Yes, Delete']").click();
        cy.xpath('//div[@class="sc-bdVaJa ftyubV"]').should("be.visible").then(($alert) => {
            const alertText = $alert.text(); // Capture the alert message text
            expect(alertText).to.include("Draft deleted successfully"); // Assert the text in the alert message
        cy.location("href").should("eq", "https://bloom.test.mpharma.com/orders/drafts")
        
        })
    })

    it('Verify count decreases when draft is deleted', () => {
        cy.intercept({
          method: "GET",
          url: "https://api.test.mpharma.com/orders-bff/orders?facility_id=5e5e3ba59c070e004ee55184&is_mymutti=false&is_draft=true&is_pos=false",
        }).as("draftId");
        cy.wait("@draftId").then((data) => {
          expect(data.response.statusCode, "Response Status Code").to.equal(200);
          const updatedCount = data.response.body.count;
          expect(updatedCount).to.equal(cntDft - 1);
        });  
      
      });   
})