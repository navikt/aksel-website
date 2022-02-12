import React from "react";
import * as S from "./header.styles";
import PortalNavigation from "./PortalNavigation";

const GodPraksisHeader = (): JSX.Element => (
  <S.Header>
    <PortalNavigation title="God Praksis" />
  </S.Header>
);

export default GodPraksisHeader;
