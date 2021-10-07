import { Hamburger, Bell } from "@navikt/ds-icons";
import { Header as DsHeader } from "@navikt/ds-react-internal";
import * as React from "react";
import { createContext, useContext, useState } from "react";
import { LayoutContext } from "../Layout";
import HeadingDropDown from "./Dropdown";
import * as S from "./header.styles";
import HeaderSearchBar from "./Searchbar";

const SearchHambGroup = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <>
      <HeaderSearchBar />
      <S.Link href="#" isMobile={isMobile}>
        <Bell
          focusable={false}
          aria-label="Notifikasjons ikon"
          style={{ fontSize: "1.5rem", marginLeft: 3 }}
        />
      </S.Link>
      {isMobile && (
        <>
          <S.Link href="#" isMobile={isMobile}>
            <Hamburger
              focusable={false}
              aria-label="Meny ikon"
              style={{ fontSize: "1.5rem", marginLeft: 3 }}
            />
          </S.Link>
        </>
      )}
    </>
  );
};

export const HeaderContext = createContext(null);

export const titles = {
  ds: "Designsystemet",
  gp: "God Praksis",
};

function Header(): JSX.Element {
  const context = useContext(LayoutContext);

  const [openSearchBar, setOpenSearchBar] = useState(false);

  return (
    <HeaderContext.Provider value={{ openSearchBar, setOpenSearchBar }}>
      <DsHeader>
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
        <SearchHambGroup isMobile={context.isMobile} />
      </DsHeader>
    </HeaderContext.Provider>
  );
}

export default Header;
