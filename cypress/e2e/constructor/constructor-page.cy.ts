describe('Checking the functionality of the constructor-page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' }).as(
      'getIngredients'
    );

    cy.visit('http://localhost:4000/');

    cy.get(`[data-cy='Биокотлета из марсианской Магнолии']`).as('filling');
    cy.get(`[data-cy='Краторная булка N-200i']`).as('bun');
  });

  describe('Сhecking the addition of ingredients', () => {
    it('should change the counter of filling', () => {
      cy.get('@filling').find('button').click();
      cy.get('@filling').find('.counter').contains('1');
    });

    it('should change the counter of bun', () => {
      cy.get('@bun').find('button').click();
      cy.get('@bun').find('.counter').contains('2');
    });
  });

  describe('Checking the functionality of modals', () => {
    it('should open with correct data', () => {
      cy.get('@filling').click();
      cy.url().should('contain', '643d69a5c3f7b9001cfa0941');
    });

    it('should close by click on X', () => {
      cy.get('@filling').click();
      cy.url().should('contain', '643d69a5c3f7b9001cfa0941');
      cy.get(`[data-cy='onXCloseModal']`).click();
    });

    it('should close by click on overlay', () => {
      cy.get('@filling').click();
      cy.url().should('contain', '643d69a5c3f7b9001cfa0941');
      cy.get(`[data-cy='onOverlayCloseModal']`).click({ force: true });
    });
  });

  describe('Checking the order process', () => {
    it('should create a new order', () => {
      cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
      cy.intercept('POST', 'api/orders', { fixture: 'order' });
      cy.setCookie('accessToken', 'test');
      localStorage.setItem('refreshToken', 'test');
      cy.visit('http://localhost:4000/');
      cy.get('#modals').as('modal');

      cy.get('@filling').find('button').click();
      cy.get('@bun').find('button').click();
      cy.get(`[data-cy='orderButton']`).click();
      cy.get('@modal').find('h2').contains('56525');
      cy.get('@modal').find('button').click();
      cy.get('@modal').children().should('have.length', 0);
      cy.get(`[data-cy='emptyBun']`).contains('Выберите булки');
      cy.get(`[data-cy='emptyFilling']`).contains('Выберите начинку');
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  });
});
