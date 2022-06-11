import { getCssRoot, readCss } from "../handle-css";

describe("Handling css", () => {
  test("Reads CSS from node_modules", () => {
    expect(() => readCss()).not.toThrow();
  });

  test("Get string output from css", () => {
    expect(typeof readCss()).toEqual("object");
  });

  test("Validate css root", () => {
    const data = getCssRoot(readCss());
    expect(data.type).toEqual("rule");
    expect(data.selectors.length).toEqual(1);
    expect(data.selectors[0]).toEqual(":root");

    /* Rough estimate for number of tokens */
    expect(data.declarations.length).toBeGreaterThan(170);
  });
});

export {};
