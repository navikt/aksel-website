/**
 * https://github.com/navikt/detsombetyrnoe/blob/main/src/components/PreviewBanner.tsx#L17
 */
import { Home, Search } from "@navikt/ds-icons";
import { Heading } from "@navikt/ds-react";
import * as React from "react";
import styled from "styled-components";
import { NAVLogoWhite } from "../../assets/NavLogoWhite";

const StyledHeader = styled.header`
  height: 70px;
  width: 100vw;
  z-index: 99;
  /* background-color: rgba(41, 41, 41, 0.98); */
  background-color: var(--navds-color-darkgray);
  grid-area: header / header / header;
  position: relative;
  display: flex;
  align-items: center;
  top: 0;
`;

const Link = styled.a`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0.5rem 1.25rem;
  color: white;
  gap: 0.5rem;
  text-decoration: none;
  min-width: 70px;
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
      width: 100%;
      box-shadow: 0 3px 0 0 white;
    }
  }
`;

const Grow = styled.div`
  flex: 1 1;
`;

const LinkRow = styled.div`
  display: flex;
  height: 100%;
`;

function Header(): JSX.Element {
  return (
    <StyledHeader className="navds-body-short">
      <Link href="#">
        <Home /> <span>Hjem</span>
      </Link>
      <Link href="#">
        <NAVLogoWhite />
        <Heading as="span" size="small">
          Designsystemet
        </Heading>
      </Link>
      <Grow />
      <LinkRow>
        <Link href="#">
          <span>Ressurser</span>
        </Link>
        <Link data-active href="#">
          <span>Komponenter</span>
        </Link>
        <Link href="#">
          <span>Mønster</span>
        </Link>
        <Link href="#">
          <span>Kategori</span>
        </Link>
        <Link href="#">
          <Search style={{ fontSize: "1.5rem", marginLeft: 3 }} />
        </Link>
      </LinkRow>
    </StyledHeader>
  );
}

export default Header;
