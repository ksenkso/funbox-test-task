context('Mobile features', () => {
  beforeEach(() => {
    cy.viewport('iphone-5');
    cy.visit('http://localhost:3000', {
      onBeforeLoad: (win) => {
        win.ontouchstart = true;
      },
    });
  });

  it('should expose an add button', () => {
    cy.findByRole('button', { name: /Добавить точку/i }).should('be.visible');

    const placemarkName = 'item name';
    cy.addPlacemark(placemarkName);

    cy.findByRole('button', { name: /Добавить точку/i }).click()
    cy.findByRole('textbox').should('be.empty');
    cy.findByText(placemarkName).should('be.visible');
  });
});
