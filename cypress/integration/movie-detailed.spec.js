/// <reference types="Cypress" />

context('Detailed Movie', () => {
    beforeEach(() => {

    });
    describe('Component', () => {
        it('Displays Detailed Page', () => {
            cy.visit('/tt4244162');
            cy.get('[data-cy=detailed]');
        });
    });
});
