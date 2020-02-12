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

            cy.get('[data-cy=movie] [data-cy=search] [data-cy=input]').clear({ delay: 500 }).type('test');
        });

        it('Clicks the Search button', () => {
            cy.get('[data-cy=movie] [data-cy=search] [data-cy=btn]').click({ force: true });
        });

        it('Displays the list of movie with valid input with Click Button', () => {
            cy.get('[data-cy=movie] [data-cy=list]').then(d => console.log(d));
        });

        it('Displays Error Message with invalid input with Click Button', () => {
            cy.get('[data-cy=movie] [data-cy=search] [data-cy=input]').clear({ delay: 500 });
            cy.get('[data-cy=movie] [data-cy=search] [data-cy=btn]').click({ force: true });
            cy.get('[data-cy=movie] [data-cy=error]');

            cy.get('[data-cy=movie] [data-cy=search] [data-cy=input]').clear({ delay: 500 }).type('a');
            cy.get('[data-cy=movie] [data-cy=search] [data-cy=btn]').click({ force: true });
            cy.get('[data-cy=movie] [data-cy=error]');

            cy.get('[data-cy=movie] [data-cy=search] [data-cy=input]').clear({ delay: 500 }).type('aasdfsdfasdfas');
            cy.get('[data-cy=movie] [data-cy=search] [data-cy=btn]').click({ force: true });
            cy.get('[data-cy=movie] [data-cy=error]');
        });
        
        it('Displays the list of movie with valid input with Typing the debounce 2 seconds', () => {

            cy.get('[data-cy=movie] [data-cy=search] [data-cy=input]').clear({ delay: 500 }).type('test');
            cy.get('[data-cy=movie] [data-cy=list]');

            cy.get('[data-cy=movie] [data-cy=search] [data-cy=input]').clear({ delay: 500 }).type('default');
            cy.get('[data-cy=movie] [data-cy=list]');
        });

        it('Click and Displays Advanced Search', () => {
            cy.get('[data-cy=movie] [data-cy=search] [data-cy=advanced]').click({ force: true, delay: 2000 });
            cy.get('[data-cy=movie] [data-cy=advanced-search]');
        });

        it('Display List based on Advanced Search', () => {
            cy.get('[data-cy=movie] [data-cy=advanced-search] [data-cy=type]').select('movie');
            cy.get('[data-cy=movie] [data-cy=advanced-search] [data-cy=year]').type('{del}{selectall}{backspace}').type(2015);
            cy.get('[data-cy=movie] [data-cy=advanced-search] [data-cy=page]').type('{del}{selectall}{backspace}').type(2);
            cy.get('[data-cy=movie] [data-cy=search] [data-cy=input]').clear().type('test');
            cy.get('[data-cy=movie] [data-cy=search] [data-cy=btn]').click({ force: true });
            cy.get('[data-cy=movie]').find('[data-cy=list]').find('[data-cy=year]').should(data => expect(data.text, '2015'));
            cy.get('[data-cy=movie]').find('[data-cy=list]').find('[data-cy=type]').should(data => expect(data.text, 'movie'));
        });

        it('Display Pagination', () => {
            cy.get('[data-cy=movie] [data-cy=pagination]');
        });
    });
});
