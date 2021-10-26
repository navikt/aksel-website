import * as React from "react";
import { useContext } from "react";
import { LayoutContext, LayoutParts } from "../Layout";
import PortalNavigation from "./PortalNavigation";

import * as S from "./header.styles";

const DesignsystemHeader = (): JSX.Element => {
  const context = useContext(LayoutContext);

  const nonMobile = (
    <>
      <PortalNavigation title={LayoutParts[context.version].title ?? ""} />
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
      <PortalNavigation title={LayoutParts[context.version].title ?? ""} />
    </>
  );

  return <S.Header>{context.isTablet ? mobile : nonMobile}</S.Header>;
};
export default DesignsystemHeader;
