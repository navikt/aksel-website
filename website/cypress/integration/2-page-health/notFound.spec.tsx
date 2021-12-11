/// <reference types="cypress"/>

import urls from "../../test-urls.json";

describe("Testing that no page returns 404", () => {
  urls.forEach((url) => {
    it(`Page is not 404: ${url}`, () => {
      cy.visit(url);
      cy.wait(100);
      cy.get("#vk-notFoundId").should("not.exist");
    });
  });
});

export = {};
