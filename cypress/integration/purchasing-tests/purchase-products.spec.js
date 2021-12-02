describe('Purchasing products on eccommerce without a registered user',()=>{
    beforeEach(() => {
        cy.visit('http://automationpractice.com/index.php')
      })

    it('when the user tries to purchase items then registration page must be shown the  to finish purchasing', () => {
        cy.goToProductCategory('Dresses')
        cy.addProductToCart('Printed Summer Dress')		
        cy.checkOutProducts()			
        cy.startRegistration()
		cy.get('.account_creation').should('be.visible')
        cy.contains('Street address, P.O. Box, Company name, etc.').should('be.visible')
        cy.contains('You must register at least one phone number.').should('be.visible')
        cy.contains('Required field').should('be.visible')
        cy.get('#submitAccount').should('be.enabled')
    })
})