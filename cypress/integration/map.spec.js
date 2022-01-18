context('Map interactions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should allow to reorder placemarks by dragging them', () => {
    const items = Array(3).fill(null).map((_, index) => `item ${index}`);

    items.forEach(placemarkName => {
      cy.findByRole('textbox').type(placemarkName + '{Enter}');
    });

    cy.findAllByText(/item/).should('have.length', 3);

    const dataTransfer = new DataTransfer();

    cy.get('li:first-child').trigger('dragstart', {
      dataTransfer,
    });
    cy.get('li:last-child').trigger('drop', {
      dataTransfer,
    });
    cy.get('li:last-child').should('have.text', 'item 0');
  });

  it('should create placemarks on the map', () => {
    const items = Array(3).fill(null).map((_, index) => `item ${index}`);

    items.forEach(placemarkName => {
      cy.findByRole('textbox').type(placemarkName + '{Enter}');
    });

    cy.get('[class*=placemark-overlay] > ymaps').should('have.length', 3);
  });

  it('should show a baloon with placemark text when placemark is clicked', () => {
    cy.findByRole('textbox').type('item name{Enter}');
    cy.get('[class*=placemark-overlay] [class*=svg-icon]').first().then(icon => {
      const position = icon.offset();
      cy.get('#map').click(position.left + 10, position.top + 10);
      cy.get('#map').findByText('item name').should('be.visible');
    });
  });
});
