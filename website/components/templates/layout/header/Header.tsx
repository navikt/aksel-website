import * as React from "react";
import { createContext, useContext, useState } from "react";
import { LayoutContext } from "../Layout";
import DesignsystemHeader from "./DesignsystemHeader";

export const HeaderContext = createContext(null);

export const titles = {
  ds: {
    title: "Designsystemet",
    header: DesignsystemHeader,
  },
  gp: { title: "God Praksis", header: null },
};

function Header(): JSX.Element {
  const context = useContext(LayoutContext);

  const [openSearchBar, setOpenSearchBar] = useState(false);

  console.log(titles[context.version]?.header ?? null);

  const Comp = titles[context.version]?.header;
  if (!Comp) {
    return null;
  }

  return (
    <HeaderContext.Provider value={{ openSearchBar, setOpenSearchBar }}>
      <Comp />
    </HeaderContext.Provider>
  );
}

export default Header;
