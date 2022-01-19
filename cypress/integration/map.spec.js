context('Map interactions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  const PLACEMARK_ICON_SELECTOR = '[class*=placemark-overlay] [class*=svg-icon]';
  const PLACEMARKS_SELECTOR = '[class*=placemark-overlay] > ymaps';

  it('should allow to reorder placemarks by dragging them', () => {
    const items = Array(3).fill(null).map((_, index) => `item ${index}`);

    items.forEach(cy.addPlacemark);

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

    items.forEach(cy.addPlacemark);

    cy.get(PLACEMARKS_SELECTOR).should('have.length', 3);
  });

  it('should show a baloon with placemark text when placemark is clicked', () => {
    cy.addPlacemark('item name');
    cy.get(PLACEMARK_ICON_SELECTOR).first().then(icon => {
      const position = icon.offset();
      cy.get('#map').click(position.left + 10, position.top + 10);
      cy.get('#map').findByText('item name').should('be.visible');
    });
  });

  it('should remove placemark from the map when remove button is clicked', () => {
    cy.addPlacemark('item name');

    cy.get(PLACEMARKS_SELECTOR).should('have.length', 1);
    cy.findByRole('button', { name: /Удалить точку/i }).click();
    cy.get(PLACEMARKS_SELECTOR).should('have.length', 0);
  });
});
