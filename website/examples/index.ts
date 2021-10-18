import kebabCase from "lodash.kebabcase";

import * as Button from "./button";
import * as Alert from "./alert";
import * as AccordionMenu from "./accordion-menu";

const T = {
  ...Button,
  ...Alert,
  ...AccordionMenu,
};

// TODO: implement such that one can infer the code in preview with dynamic imports
// TODO: is dynamic imports needed?
export const Examples = Object.keys(T).reduce((prev, y) => {
  return { ...prev, [kebabCase(y)]: T[y] };
}, {});

export const ExampleKeys = Object.keys(Examples);
