describe("About page", () => {
  beforeEach(() => {
    cy.visit("/about");
  });

  it("show properly header logo", () => {
    cy.contains("h1", "mihail gaberov");
  });
});
