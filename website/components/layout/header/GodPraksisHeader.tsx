import React from "react";
import { useContext } from "react";
import { LayoutContext } from "../..";
import * as S from "./header.styles";
import PortalNavigation from "./PortalNavigation";

const GodPraksisHeader = (): JSX.Element => {
  const context = useContext(LayoutContext);

  const nonMobile = (
    <>
      <PortalNavigation title="God Praksis" />
      {/* <HeaderSearchBar /> */}
      {/* <S.Link href="#">
        <Bell
          focusable={false}
          aria-label="Notifikasjons ikon"
          style={{ fontSize: "1.5rem" }}
        />
      </S.Link> */}
    </>
  );

  const mobile = (
    <>
      <PortalNavigation title="God Praksis" />
    </>
  );

  return <S.Header>{context.isTablet ? mobile : nonMobile}</S.Header>;
};
export default GodPraksisHeader;
