import kebabCase from "lodash/kebabCase";
/* import * as DemoExamples from "./demo" */

const allExamples = {
  /* ...demo, */
};

// TODO: implement such that one can infer the code in preview with dynamic imports
// TODO: is dynamic imports needed?
export const Examples = Object.keys(allExamples).reduce((prev, y) => {
  return { ...prev, [kebabCase(y)]: allExamples[y] };
}, {});

export const ExampleKeys = Object.keys(Examples);
