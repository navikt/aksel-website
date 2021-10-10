/* import dynamic from "next/dynamic"; */
import * as T from "../../component-examples";
import kebabCase from "lodash.kebabcase";

// TODO: implement such that one can infer the code with dynamic imports
// TODO: is dynamic imports needed?
export const Examples = Object.keys(T).reduce((prev, y) => {
  return { ...prev, [kebabCase(y)]: T[y] };
}, {});

export const CodePreviews = (url) => {
  if (!url || !(url in Examples)) {
    return null;
  }

  const Comp = Examples[url];
  return <Comp />;
};
