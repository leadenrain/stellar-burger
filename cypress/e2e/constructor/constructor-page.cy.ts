describe('Checking the functionality of the constructor-page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' }).as(
      'getIngredients'
    );

    cy.visit('/');
    cy.wait('@getIngredients');
    cy.get(`[data-cy='Булки']`).should('have.length', 1);
    cy.get(`[data-cy='Начинки']`).should('have.length', 1);

    cy.get(`[data-cy='Биокотлета из марсианской Магнолии']`).as('filling');
    cy.get(`[data-cy='Краторная булка N-200i']`).as('bun');
    cy.get(`[data-cy='fillings']`).as('fillings');
    cy.get(`[data-cy='emptyBun']`).as('noBun');
    cy.get('#modals').as('modal');
  });

  describe('Сhecking the addition of ingredients', () => {
    it('should change the counter of filling & add to constructor', () => {
      cy.get('@fillings').contains('Выберите начинку');
      cy.get('@filling').find('.counter').should('have.length', 0);
      cy.get('@filling').find('button').click();
      cy.get('@fillings').contains('Биокотлета из марсианской Магнолии');
      cy.get('@filling').find('.counter').contains('1');
    });

    it('should change the counter of bun & add to constructor', () => {
      cy.get('@noBun').contains('Выберите булки');
      cy.get('@bun').find('.counter').should('have.length', 0);
      cy.get('@bun').find('button').click();
      cy.get(`[data-cy='buns']`).contains('Краторная булка N-200i');
      cy.get('@bun').find('.counter').contains('2');
    });
  });

  describe('Checking the functionality of modals', () => {
    it('should open with correct data', () => {
      cy.get('@modal').children().should('have.length', 0);
      cy.get('@filling').click();
      cy.get('@modal')
        .contains('Биокотлета из марсианской Магнолии')
        .should('exist');
    });

    it('should close by click on X', () => {
      cy.get('@filling').click();
      cy.get('@modal')
        .contains('Биокотлета из марсианской Магнолии')
        .should('exist');
      cy.get(`[data-cy='onXCloseModal']`).click();
      cy.get('@modal')
        .contains('Биокотлета из марсианской Магнолии')
        .should('not.exist');
    });

    it('should close by click on overlay', () => {
      cy.get('@modal').children().should('have.length', 0);
      cy.get('@filling').click();
      cy.get('@modal')
        .contains('Биокотлета из марсианской Магнолии')
        .should('exist');
      cy.get(`[data-cy='onOverlayCloseModal']`).click({ force: true });
      cy.get('@modal')
        .contains('Биокотлета из марсианской Магнолии')
        .should('not.exist');
    });
  });

  describe('Checking the order process', () => {
    it('should create a new order', () => {
      cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
      cy.intercept('POST', 'api/orders', { fixture: 'order' }).as(
        'createOrder'
      );
      cy.setCookie('accessToken', 'test');
      cy.window().then((window) => {
        window.localStorage.setItem('refreshToken', 'test');
      });

      cy.visit('/');

      cy.get('@noBun').contains('Выберите булки');
      cy.get('@fillings').contains('Выберите начинку');
      cy.get('@filling').find('.counter').should('have.length', 0);
      cy.get('@filling').find('button').click();
      cy.get('@fillings').contains('Биокотлета из марсианской Магнолии');
      cy.get('@filling').find('.counter').contains('1');
      cy.get('@bun').find('button').click();
      cy.get(`[data-cy='buns']`).contains('Краторная булка N-200i');
      cy.get('@bun').find('.counter').contains('2');
      cy.get(`[data-cy='orderButton']`).click();

      cy.get('@modal').find('h2').contains('56525').should('exist');
      cy.get('@modal').find('button').click();
      cy.get('@modal').children().should('have.length', 0);
      cy.get('@noBun').contains('Выберите булки');
      cy.get('@fillings').contains('Выберите начинку');
      cy.clearCookie('accessToken');
      window.localStorage.removeItem('refreshToken');
    });
  });
});
