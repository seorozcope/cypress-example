const { find } = require("lodash")

Cypress.Commands.add('clickIfEnabled', (locator) => { 
    cy.get(locator).then(($btn) => {
        if ($btn.is(":enabled")) {
            cy.wrap($btn).click()
        }
    })
 })

Cypress.Commands.add('goToProductCategory', (productoCategoryName) => { 
    cy.get('#block_top_menu a[title='+productoCategoryName+']').first().as('product-category-button')
    cy.get('@product-category-button').focus().click()
 })

Cypress.Commands.add('addProductToCart', (theProduct) => { 
    cy.get('.product_list  a[class="product-name"]').contains(theProduct).first().parent('[itemprop="name"]').parent('.right-block')
    .contains('Add to cart').click()
    cy.wait(2000)
    cy.get('[title="Close window"]').click()
})

Cypress.Commands.add('addAListOfProductsToCart', () => { 
    cy.fixture("list-of-products").then(productList=>{
        productList.products.forEach(product => {
            cy.clickIfEnabled('[title="Close window"]')
            cy.goToProductCategory(product.category)
            cy.addProductToCart(product.name) 
        })      
    })
})

Cypress.Commands.add('goToPurchasigCart', (productoCategoryName) => { 
    cy.get('[title="View my shopping cart"]').click()
 })

Cypress.Commands.add('checkOutProducts', () => { 
    cy.get('a[title="Proceed to checkout"]:last').click()
    cy.get('a[title="Proceed to checkout"]:last').click()
})

Cypress.Commands.add('startRegistration', () => { 
    cy.get('#email_create').type('an@email.com')	
    cy.get('#SubmitCreate').click()
})

Cypress.Commands.add('productsMustBeShown', () => { 
    cy.fixture("list-of-products").then(productList=>{
        productList.products.forEach(product => {
            cy.get('#order-detail-content .product-name a').contains(product.name).should('be.visible')
        })      
    })
})

Cypress.Commands.add('productsMustNotBeShown', (removedProducstList) => { 
    cy.get('#order-detail-content .product-name a').as('theProduct')
    cy.fixture("list-of-products").then(productList=>{
        productList.products.forEach(product => {
            cy.log('the product: '+ product.name)
            removedProducstList.forEach(removedProduct=>{
                cy.log('removed products from list: ' + removedProduct.name)
                if(removedProduct.name==product.name){
                    cy.get('@theProduct').contains(removedProduct.name).should('not.exist')
                }else{
                    cy.get('@theProduct').contains(product.name).should('be.visible')
                }
            })
        })      
    })
})