export{}
import {} from "cypress";

describe('End to end test', () => {

    it('Front page loaded', () => {
        cy.visit('http://localhost:19002/');
        cy.contains('/');
      });
})