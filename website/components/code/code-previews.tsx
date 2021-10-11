import { Examples } from "../../examples";

export const CodePreviews = (url) => {
  if (!url || !(url in Examples)) {
    return null;
  }

  const Comp = Examples[url];
  return <Comp />;
};
