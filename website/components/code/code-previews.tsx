import { Examples } from "../../examples";

export const CodePreviews = (url) => {
  if (!url || !(url in Examples)) {
    return null;
  }

  const Comp: {
    (): JSX.Element;
  } = Examples[url];

  return Comp;
};
