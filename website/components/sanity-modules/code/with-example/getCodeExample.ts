import { Examples } from "../../../../stories/examples";
import { ExampleComponent } from "@/lib";

const getCodeExample = (url: string) => {
  if (!url || !(url in Examples)) {
    return null;
  }

  const Comp: ExampleComponent = Examples[url];

  return Comp;
};

export default getCodeExample;
