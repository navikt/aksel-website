/// <reference types="cypress"/>

describe("Test Case 2", () => {
  /* before(() => {
    cy.exec('yarn run generate:testurls')
      .then((x) => {
        console.log(x)
      });
    });
  }); */
  /* it("Testaaa", () => {
    const fetchUrls = () =>
      new Cypress.Promise((resolve, reject) => {
        const urls = getDsPaths()
          .then((urls) => urls.map((u) => `/${u.join("/")}`))
          .catch(() => reject());
        resolve(urls);
      });

    cy.wrap(null).then(() => {
      fetchUrls().then((urls: string[]) => {
        urls.forEach((url) => {
          cy.visit(url);
          cy.get(".vk-errorboundary").should("not.exist");
        });
      });
    });
  }); */
});

export = {};
