/// <reference types="Cypress" />

context('Movie', () => {
    beforeEach(() => {

    });
    describe('Component', () => {
        it('Renders Movie Component', () => {
            cy.get('[data-cy=movie]').find('[data-cy=header]');
            cy.get('[data-cy=movie]').find('[data-cy=search]');
            cy.get('[data-cy=movie]').find('[data-cy=list]');
        });

        it('Accepts User input', () => {
            cy.get('[data-cy=movie] [data-cy=search] [data-cy=input]').type('francis', { delay: 500 });

            cy.get('[data-cy=movie] [data-cy=search] [data-cy=input]').clear({ delay: 500 }).type('declaro');
        });

        it('Clicks the Search button', () => {
            cy.get('[data-cy=movie] [data-cy=search] [data-cy=btn]').click({ force: true }).then(data => console.log(data[0].dataset));
        });

        it('Check the list of movie', () => {
            cy.get('[data-cy=movie] [data-cy=list]').then(d => console.log(d));
        });
    });
});
