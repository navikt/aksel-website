/**
 * https://github.com/navikt/detsombetyrnoe/blob/main/src/components/PreviewBanner.tsx#L17
 */
import { Hamburger, Home, Search } from "@navikt/ds-icons";
import { Heading } from "@navikt/ds-react";
import * as React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { NAVLogoWhite } from "../../assets/NavLogoWhite";
import { LayoutContext, LayoutContextProps } from "./Layout";

const StyledHeader = styled.header<{ context: LayoutContextProps }>`
  height: ${(props) => (props.context.isMobile ? "fit-content" : "48px")};
  flex-direction: ${(props) => (props.context.isMobile ? "column" : "row")};
  width: 100vw;
  z-index: 99;
  background-color: var(--navds-color-darkgray);
  grid-area: header / header / header;
  position: relative;
  display: flex;
  align-items: center;
  top: 0;
  overflow-x: auto;
  padding: 0 1rem;
  padding: ${(props) => (props.context.isMobile ? "0" : "0 1rem")};
`;

const Link = styled.a<{ isMobile: boolean }>`
  height: 100%;
  display: flex;
  align-items: center;
  padding: ${(props) => (props.isMobile ? "0 0.75rem" : "0 0.75rem")};
  color: white;
  column-gap: 0.5rem;
  text-decoration: none;
  min-width: 48px;
  height: 100%;
  min-height: 48px;
  justify-content: center;

  > * {
    transition: box-shadow 75ms;
  }

  :hover {
    background-color: var(--navds-color-gray-80);
    > *:not(svg) {
      box-shadow: 0 3px 0 0 white;
    }
  }

  :focus {
    outline: 2px solid white;
    outline-offset: -4px;
  }

  svg {
    flex-shrink: 0;
  }

  &[data-active] {
    > * {
      box-shadow: 0 3px 0 0 white;
    }
  }
`;

const Grow = styled.div`
  flex: 1 1;
`;

const LinkRow = styled.div<{ context: LayoutContextProps }>`
  display: ${(props) => (props.context.isMobile ? "grid" : "flex")};
  height: 100%;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);

  @media screen and (max-width: 550px) {
    grid-template-columns: repeat(2, 1fr);
  }

  > * {
    flex: ${(props) => (props.context.isMobile ? "1 1" : "")};
  }
`;

const RowDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const CenterLink = styled(Link)`
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 100px;
  height: 70px;
`;

const SearchHambGroup = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <>
      <Link href="#" isMobile={isMobile}>
        <Search style={{ fontSize: "1.5rem", marginLeft: 3 }} />
      </Link>
      {isMobile && (
        <Link href="#" isMobile={isMobile}>
          <Hamburger style={{ fontSize: "1.5rem", marginLeft: 3 }} />
        </Link>
      )}
    </>
  );
};

function Header(): JSX.Element {
  const context = useContext(LayoutContext);

  return (
    <StyledHeader context={context} className="navds-body-short">
      <RowDiv>
        <Link href="#" isMobile={context.isMobile}>
          <Home />
        </Link>
        {!context.isMobile ? (
          <Link href="#" isMobile={context.isMobile}>
            <NAVLogoWhite />
            <Heading as="span" size="small">
              Designsystemet
            </Heading>
          </Link>
        ) : (
          <CenterLink href="#" isMobile={context.isMobile}>
            <NAVLogoWhite />
          </CenterLink>
        )}

        {context.isMobile && (
          <>
            <Grow />
            <SearchHambGroup isMobile={context.isMobile} />
          </>
        )}
      </RowDiv>
      <LinkRow context={context}>
        {!context.isMobile && <Grow />}
        <Link href="#" isMobile={context.isMobile}>
          <span>Ressurser</span>
        </Link>
        <Link data-active href="#" isMobile={context.isMobile}>
          <span>Komponenter</span>
        </Link>
        <Link href="#" isMobile={context.isMobile}>
          <span>Mønster</span>
        </Link>
        <Link href="#" isMobile={context.isMobile}>
          <span>Kategori</span>
        </Link>
        <Link href="#" isMobile={context.isMobile}>
          <span>Kategori</span>
        </Link>
        <Link href="#" isMobile={context.isMobile}>
          <span>Kategori</span>
        </Link>
        {!context.isMobile && <SearchHambGroup isMobile={context.isMobile} />}
      </LinkRow>
    </StyledHeader>
  );
}

export default Header;
