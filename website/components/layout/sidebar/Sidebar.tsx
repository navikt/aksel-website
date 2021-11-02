import { useContext } from "react";
import { LayoutContext, LayoutParts } from "../Layout";

const Sidebar = (): JSX.Element => {
  const context = useContext(LayoutContext);

  const Comp = LayoutParts[context.version]?.sidebar;
  if (!Comp) {
    return null;
  }

  return <Comp />;
};

export default Sidebar;
