import { Hamburger, Bell } from "@navikt/ds-icons";
import { Header as DsHeader } from "@navikt/ds-react-internal";
import * as React from "react";
import { createContext, useContext, useState } from "react";
import { useMedia } from "react-use";
import { NavLogoWhite } from "../../..";
import { LayoutContext } from "../Layout";
import HeadingDropDown from "./Dropdown";
import * as S from "./header.styles";
import HeaderSearchBar from "./Searchbar";

export const HeaderContext = createContext(null);

export const titles = {
  ds: "Designsystemet",
  gp: "God Praksis",
};

function Header(): JSX.Element {
  const context = useContext(LayoutContext);

  const [openSearchBar, setOpenSearchBar] = useState(false);
  const removeLogo = !useMedia("(max-width: 564px)");

  const nonMobile = (
    <>
      <HeadingDropDown isMobile={context.isMobile} />
      <S.Links>
        <S.Link href="#">Kom i gang</S.Link>
        <S.Link href="#">Guider</S.Link>
        <S.Link href="#">Produktbrief</S.Link>
        <S.Link href="#">Styling</S.Link>
        <S.Link href="#">Komponenter</S.Link>
        <S.Link href="#">Mønster</S.Link>
        <S.Link href="#">Ressurser</S.Link>
        <S.Link href="#">Hjelp</S.Link>
      </S.Links>
      <HeaderSearchBar />
      <S.Link href="#" isMobile={context.isMobile}>
        <Bell
          focusable={false}
          aria-label="Notifikasjons ikon"
          style={{ fontSize: "1.5rem" }}
        />
      </S.Link>
    </>
  );

  const mobile = (
    <>
      <HeaderSearchBar />
      <S.Link
        style={{ marginLeft: "auto", marginRight: "auto" }}
        href="#"
        isMobile={context.isMobile}
      >
        {removeLogo && <NavLogoWhite focusable={false} aria-label="NAV logo" />}
        {titles[context.version] ?? ""}
      </S.Link>
      <S.Link href="#" isMobile={context.isMobile}>
        <Hamburger
          focusable={false}
          aria-label="Meny ikon"
          style={{ fontSize: "1.5rem" }}
        />
      </S.Link>
    </>
  );

  return (
    <HeaderContext.Provider value={{ openSearchBar, setOpenSearchBar }}>
      <DsHeader>{context.isMobile ? mobile : nonMobile}</DsHeader>
    </HeaderContext.Provider>
  );
}

export default Header;
