describe('a user can manage his/her purchasing cart',()=>{
    beforeEach(() => {
        cy.visit('http://automationpractice.com/index.php')
        cy.addAListOfProductsToCart()
      })

    it('when the user adds 2 products to the cart, then he/she must be able to watch them on the purchasing cart', () => {
        cy.goToPurchasigCart()
        cy.get('.ajax_cart_quantity').should('contain',2)
        cy.get('#order-detail-content .product-name')
        .should('have.length', 2)
        cy.get('#order-detail-content .cart_quantity_input').each((item) => {
             cy.wrap(item).should('have.value',1)
        })
        cy.productsMustBeShown()
    })

    it.only('when user doesn\'t want to keep a product then he/she must be able to delete it from purchasing cart',()=>{
        let productRemoved=[]
        cy.goToPurchasigCart()
        cy.fixture("list-of-products").then(productList=>{
            productRemoved=[productList.products[0]]
            cy.get('tr[id*="product"] .product-name a').contains(productRemoved[0].name)
            .parents('tr[id*="product"]').find('.cart_quantity_delete').click()            
        })
        cy.wait(2000)
        cy.productsMustNotBeShown(productRemoved)
    })
})