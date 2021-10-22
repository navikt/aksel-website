import { Examples } from "../../../examples";

const getCodeExample = (url: string) => {
  if (!url || !(url in Examples)) {
    return null;
  }

  const Comp: {
    (): JSX.Element;
  } = Examples[url];

  return Comp;
};

export default getCodeExample;
