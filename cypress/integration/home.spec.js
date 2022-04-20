describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("document should have correct title", () => {
    cy.title().should("eq", "Mihail Gaberov");
  });

  it("should show header text", () => {
    cy.contains("h1", "mihail gaberov");
  });

  it("should have theme switcher", () => {
    cy.get("[data-cy='themeSwitch']").should.exist;
  });

  it("should change the theme when click theme switcher", () => {
    cy.get("[data-theme='system']").should.exist;
    cy.get("[data-cy='themeSwitch'] > button").click();
    cy.get("[data-theme='dark']").should.exist;
    cy.get("[data-cy='themeSwitch'] > button").click();
    cy.get("[data-theme='light']").should.exist;
  });
});
