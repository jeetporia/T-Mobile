describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('should mark a book as finished and display the correct information', () => {
    cy.get('input[type="search"]').type('JavaScript');
    cy.get('form').submit();
    cy.get('[data-testing="book-item"]').first().within(() => {
      cy.get('button[color="primary"]').should('be.visible').should('not.be.disabled').click();
    });
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('.reading-list-item').first().within(() => {
      cy.get('button[color="primary"]').click();
    });
    cy.get('.finishedStatus').should('exist');
    cy.get('.finishedOnTxt').should('contain', 'Finished on');
  });

});
