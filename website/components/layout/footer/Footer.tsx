import * as React from "react";
import { useContext } from "react";
import { LayoutContext, LayoutParts } from "../Layout";

function Footer(): JSX.Element {
  const context = useContext(LayoutContext);

  const Comp = LayoutParts?.[context.version]?.footer;

  if (!Comp) {
    return null;
  }

  return <Comp />;
}

export default Footer;
