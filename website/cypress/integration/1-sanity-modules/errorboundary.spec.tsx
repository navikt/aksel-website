/// <reference types="cypress"/>

import urls from "../../test-urls.json";

describe("No pages has an errorboundary", () => {
  urls.forEach((url) => {
    it(`Url has no errorboundary: ${url}`, () => {
      cy.visit(url);
      cy.get(".vk-errorboundary").should("not.exist");
    });
  });
});

export = {};
