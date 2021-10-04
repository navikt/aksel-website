import { Hamburger, Search } from "@navikt/ds-icons";
import * as React from "react";
import { useContext } from "react";
import { LayoutContext } from "../Layout";
import HeadingDropDown from "./Dropdown";
import * as S from "./header.styles";

const SearchHambGroup = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <>
      <S.Link href="#" isMobile={isMobile}>
        <Search
          style={{ fontSize: "1.5rem", marginLeft: 3 }}
          focusable={false}
          aria-label="Søk ikon"
        />
        <span className="sr-only">Søk etter sider</span>
      </S.Link>
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

function Header(): JSX.Element {
  const context = useContext(LayoutContext);

  return (
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
        <S.Link href="#" isMobile={context.isMobile}>
          <span>Ressurser</span>
        </S.Link>
        <S.Link data-active href="#" isMobile={context.isMobile}>
          <span>Komponenter</span>
        </S.Link>
        <S.Link href="#" isMobile={context.isMobile}>
          <span>Mønster</span>
        </S.Link>
        <S.Link href="#" isMobile={context.isMobile}>
          <span>Kategori</span>
        </S.Link>
        <S.Link href="#" isMobile={context.isMobile}>
          <span>Kategori</span>
        </S.Link>
        <S.Link href="#" isMobile={context.isMobile}>
          <span>Kategori</span>
        </S.Link>
        {!context.isMobile && <SearchHambGroup isMobile={context.isMobile} />}
      </S.LinkRow>
    </S.Header>
  );
}

export default Header;
