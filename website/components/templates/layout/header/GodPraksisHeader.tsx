import * as React from "react";
import { useContext } from "react";
import { LayoutContext, LayoutParts } from "../Layout";
import HeadingDropDown from "./MainDropdown";
import HeaderSearchBar from "./Searchbar";

import * as S from "./header.styles";

const DesignsystemHeader = (): JSX.Element => {
  const context = useContext(LayoutContext);

  const nonMobile = (
    <>
      <HeadingDropDown title={LayoutParts[context.version].title ?? ""} />
      <HeaderSearchBar />
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
      <HeadingDropDown title={LayoutParts[context.version].title ?? ""} />
      <HeaderSearchBar />
    </>
  );

  return <S.Header>{context.isMobile ? mobile : nonMobile}</S.Header>;
};
export default DesignsystemHeader;
