describe("About page", () => {
  beforeEach(() => {
    cy.visit("/about");
  });

  it("show properly header logo", () => {
    cy.contains("h1", "mihail gaberov");
  });

  it("should show About nav as active", () => {
    cy.contains("a", "ABOUT").should("have.class", "active");
  });

  it("should contain favorite phrase", () => {
    cy.contains(
      "blockquote",
      "If you want to really learn something, try teaching it to someone else."
    );
  });
});
