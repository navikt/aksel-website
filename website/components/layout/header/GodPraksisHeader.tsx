import { Header } from "@navikt/ds-react-internal";
import React from "react";
import PortalNavigation from "./menu/PortalNav";

const GodPraksisHeader = (): JSX.Element => (
  <Header className="z-[1050] h-[var(--header-height)]">
    <PortalNavigation title="God Praksis" />
  </Header>
);

export default GodPraksisHeader;
