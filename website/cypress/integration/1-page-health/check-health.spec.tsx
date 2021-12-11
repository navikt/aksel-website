/// <reference types="cypress"/>

import urls from "../../test-urls.json";

describe("Testing health for all pages", () => {
  urls.forEach((url) => {
    beforeEach(() => {
      cy.visit(url);
      cy.wait(100);
    });

    it(`No errorboundary: ${url}`, () => {
      cy.get(".vk-errorboundary").should("not.exist");
    });

    it(`Does not return 404: ${url}`, () => {
      cy.get("#vk-notFoundId").should("not.exist");
    });
  });
});

export = {};
