import * as React from "react";
import { createContext, useContext, useState } from "react";
import { LayoutContext, LayoutParts } from "../Layout";

export const HeaderContext = createContext(null);

function Header(): JSX.Element {
  const context = useContext(LayoutContext);

  const [openSearchBar, setOpenSearchBar] = useState(false);

  const Comp = LayoutParts?.[context.version]?.header;

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
