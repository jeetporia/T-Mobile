describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('should search for JavaScript books, click on "Want to Read", undo action', () => {
    cy.get('input[type="search"]').type('JavaScript');
    cy.get('form').submit();
    cy.get('[data-testing="book-item"]').should('have.length.gt', 0);
    cy.get('[data-testing="book-item"]')
      .first()
      .within(() => {
        cy.get('.add-button').should('not.be.disabled').click();
      });
    cy.get('.mat-snack-bar-container').should('be.visible');
    cy.get('.mat-snack-bar-container').contains('Undo').click();
    cy.get('[data-testing="book-item"]').first().find('.add-button').should('not.be.disabled');
  });

  it('should open reading list, delete an item, and undo the deletion', () => {
    cy.visit('/')
    cy.get('input[type="search"]').type('JavaScript');
    cy.get('form').submit();
    cy.get('[data-testing="book-item"]').should('have.length.gt', 0);
    cy.get('[data-testing="book-item"]')
      .first()
      .within(() => {
        cy.get('.add-button').should('not.be.disabled').click();
      });

    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('[data-testing="reading-list-container"]').should('be.visible');
    cy.get('.reading-list-item').its('length').then(initialCount => {

      cy.get('.reading-list-item').first().within(() => {
        cy.get('.remove-button').click();
      });
      cy.get('.mat-snack-bar-container').should('be.visible');
      cy.get('.mat-snack-bar-container').contains('Undo').click();
      cy.get('.reading-list-item').should('have.length', initialCount);
    });
  });
});
