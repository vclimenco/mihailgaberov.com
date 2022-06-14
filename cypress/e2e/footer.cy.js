const packageJson = require("../../package.json");

describe("Footer", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should have social links", () => {
    cy.get("[data-cy='footer']").should.exist;
    cy.get("[data-cy='footer']").contains("a", "twitter");
    cy.get("[data-cy='footer']").contains("a", "github");
    cy.get("[data-cy='footer']").contains("a", "rss");
  });

  it("social links should work correctly", () => {
    cy.get("[data-cy='twitterLink']").then((link) => {
      cy.request(link.prop("href")).its("status").should("eq", 200);
    });
    cy.get("[data-cy='githubLink']").then((link) => {
      cy.request(link.prop("href")).its("status").should("eq", 200);
    });
    cy.get("[data-cy='rssLink']").then((link) => {
      cy.request(link.prop("href")).its("status").should("eq", 200);
    });
  });

  it("should contain copyright info", () => {
    cy.get("[data-cy='footer']").contains(
      "li",
      "© Mihail Gaberov 2022. All rights reserved."
    );
  });

  it("should contain no tracking info", () => {
    cy.get("[data-cy='footer']").contains(
      "li",
      "I don't track you in any way, hence no cookies or jam are used here."
    );
  });

  it("should contain version number", () => {
    cy.get("[data-cy='footer']").contains("li", `v.${packageJson.version}`);
  });
});
