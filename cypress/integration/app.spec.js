/// <reference types="Cypress" />

context('App', () => {
    beforeEach(() => {

    });
    describe('Component', () => {

        it('Visit the Server', () => {
            cy.visit('/');
        });

        it('Renders App / Initial Page', () => {
            cy.get('[data-cy=app]');

        });

        it('Renders Movie Component', () => {
            cy.get('[data-cy=movie]');
            // cy.get('[data-cy=movie-header]');
            // cy.get('[data-cy=movie-search]');
            // cy.get('[data-cy=movie-list]');
        });
    });
});
