/// <reference types="cypress" />

describe('Products', () => {
  beforeEach(() => {
    cy.fixture('products.json').as('productsJSON');
    cy.fixture('products2.json').as('products2JSON');
    cy.fixture('products3.json').as('products3JSON');
    cy.fixture('products4.json').as('products4JSON');
    cy.fixture('collections.json').as('collectionsJSON');
    cy.fixture('themes.json').as('themesJSON');
    cy.fixture('product30293.json').as('product30293JSON');

    cy.server({ force404: true });
    cy.route('**/get-cypress-config', { cypress: true }).as('cypressConfig');
    cy.route('**/products/30293', '@product30293JSON').as('product30293');
    cy.route('**/products?page=1&pageSize=50', '@productsJSON').as('products');
    cy.route('**/products?page=2&pageSize=50', '@products2JSON').as(
      'products2'
    );
    cy.route('**/products?page=3&pageSize=50', '@products3JSON').as(
      'products3'
    );
    cy.route('**/products?page=4&pageSize=50', '@products4JSON').as(
      'products4'
    );
    cy.route('**/collections', '@collectionsJSON').as('collections');
    cy.route('**/themes', '@themesJSON').as('themes');
    // cy.route('**/product-images**', '@logo');

    cy.visit('/');
    cy.get('mat-list-item:nth-child(1) > div > div.mat-list-text > a')
      .first()
      .click();
    // cy.wait('@themes');
    cy.wait('@products');
  });
  it('displays first page of 50 products', () => {
    cy.get('.product-card-compact').should('have.length', 50);
    cy.get('app-product-pager');
    cy.get('.mat-paginator-range-label').contains(' 1 – 50 of 159 ');
  });
  it('navigates to next page products', () => {
    cy.get('app-product-pager button').last().click();
    cy.wait('@products2');
    cy.get('.product-card-compact').should('have.length', 50);
    cy.get('.mat-paginator-range-label').contains(' 51 – 100 of 159 ');
    cy.get('app-product-pager button').last().click();
    cy.wait('@products3');
    cy.get('.product-card-compact').should('have.length', 50);
    cy.get('.mat-paginator-range-label').contains(' 101 – 150 of 159 ');
    cy.get('app-product-pager button').last().click();
    cy.wait('@products4');
    cy.get('.product-card-compact').should('have.length', 9);
    cy.get('.mat-paginator-range-label').contains(' 151 – 159 of 159 ');
  });
  it('navigates to product details page', () => {
    cy.get('.product-title a').first().click();
    // cy.wait('@product30293');
    cy.get('h1');
  });
});
