describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it("show properly header logo", () => {
    cy.contains('h1', 'mihail gaberov')
  })

  /*it("links to #/register", () => {
    cy
        .contains('Don\'t have an account? Register here >')
        .should('have.attr', 'href', '#/register')
  })

  it("requires email", () => {
    cy.get('form').contains('Login').click()
    cy.get("input:invalid").should("have.length", 2)
  })

  it("requires password", () => {
    cy.get('[data-cy=password]').type('test@test.com{enter}')
    cy.get("input:invalid").should("have.length", 1)
  })

  it("requires valid user and password", () => {
    cy.get('[data-cy=email]').type('test@test.com')
    cy.get('[data-cy=password]').type('password{enter}')
    cy.get('.error')
        .should('contain', 'Your account is not activated yet.')
  })

  it("navigates to #/ on successful login", () => {
    cy.get('[data-cy=email]').type('mihail.gaberov@gmail.com')
    cy.get('[data-cy=password]').type('asdasdasd{enter}')
    cy.hash().should('eq', '#/')
  })*/
})
