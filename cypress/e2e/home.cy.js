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

  it("should show Home nav as active", () => {
    cy.contains("a", "POSTS").should("have.class", "active");
  });

  it("should be able to open a post via clicking at its title", () => {
    cy.get("[data-cy='postTitle']").last().click();
    cy.wait(6000);
    cy.url().should("include", "/creating-a-twitter-bot-at-5am");
  });

  it("should be able to open a post via clicking at Read Post link", () => {
    cy.get("[data-cy='readPostLink']").last().click();
    cy.wait(6000);
    cy.url().should("include", "/creating-a-twitter-bot-at-5am");
  });
});
