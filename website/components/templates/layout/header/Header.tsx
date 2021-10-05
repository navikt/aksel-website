import { Hamburger } from "@navikt/ds-icons";
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
      {isMobile && (
        <S.Link href="#" isMobile={isMobile}>
          <Hamburger
            focusable={false}
            aria-label="Meny ikon"
            style={{ fontSize: "1.5rem", marginLeft: 3 }}
          />
        </S.Link>
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
      <S.Header context={context} className="navds-body-short">
        <S.Row>
          <HeadingDropDown isMobile={context.isMobile} />
          {context.isMobile && (
            <>
              <S.Grow />
              <SearchHambGroup isMobile={context.isMobile} />
            </>
          )}
        </S.Row>

        <S.LinkRow context={context}>
          {!context.isMobile && <S.Grow />}
          {!openSearchBar ||
            (context.version === "gp" && (
              <>
                <S.Link href="#" isMobile={context.isMobile}>
                  Ressurser
                </S.Link>
                <S.Link data-active href="#" isMobile={context.isMobile}>
                  Komponenter
                </S.Link>
                <S.Link href="#" isMobile={context.isMobile}>
                  Mønster
                </S.Link>
                <S.Link href="#" isMobile={context.isMobile}>
                  Kategori
                </S.Link>
                <S.Link href="#" isMobile={context.isMobile}>
                  Kategori
                </S.Link>
              </>
            ))}
          {!context.isMobile && <SearchHambGroup isMobile={context.isMobile} />}
        </S.LinkRow>
      </S.Header>
    </HeaderContext.Provider>
  );
}

export default Header;
