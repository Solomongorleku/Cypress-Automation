import { userDetailstest } from "../../fixtures/loginData";
import { searchData } from "../../fixtures/searchData"

const { username, password } = userDetailstest;



describe('Generating Waybill', () => {
      
    before(() => {
        cy.clearCookies()
        cy.loginLMD(username, password);
    });


    it('Generates Waybill', () => {
        cy.xpath('//a[normalize-space()="Go to Deliveries"]').click();
        cy.findByText('Filter by status').click()
        cy.findAllByText('Ready To Ship').eq(0).click()
        cy.get('tr[data-testid="table-row"]').eq(0).click();
        cy.get("[data-testid='btn-generate-waybill']").click();
        cy.xpath('//input[@placeholder="Enter number of packages"]').click().type('1')
        cy.findAllByText('Generate Waybill').eq(2).click()
        cy.wait(8000)
        cy.xpath('//span[normalize-space()="View Waybill"]').click();
        cy.get('a').eq(1).should($a => {
            const href = $a.attr('href');
            expect(href).to.include('waybill');
            expect($a.attr('target')).to.equal('__blank');
          })
    });
});