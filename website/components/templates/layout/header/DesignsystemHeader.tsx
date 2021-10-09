import {
  Bell,
  Close,
  Hamburger,
  Home,
  HomeFilled,
  Left,
} from "@navikt/ds-icons";
import { BodyShort } from "@navikt/ds-react";
import { Header as DsHeader } from "@navikt/ds-react-internal";
import NextLink from "next/link";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { useKey, useMedia } from "react-use";
import styled from "styled-components";
import { NavLogoWhite } from "../../..";
import { DsNavigationHeadingT } from "../../../../lib";
import { PagePropsContext } from "../../../../pages/_app";
import { LayoutContext } from "../Layout";
import Sidebar from "../sidebar/Sidebar";
import HeadingDropDown from "./Dropdown";
import * as S from "./header.styles";
import HeaderSearchBar from "./Searchbar";

// TODO Refactor these 3 styled comps
const Button = styled.button<{ $active?: boolean }>`
  display: flex;
  padding: 0.75rem 1rem 0.75rem 2rem;
  border: none;
  background: none;
  width: 100%;

  :first-of-type {
    margin-top: 1rem;
  }

  ${(props) =>
    props.$active &&
    `
    /* box-shadow: inset 6px 0 0 0 var(--navds-color-blue-50); */
    background-color: var(--navds-color-gray-10);
    color: var(--navds-color-gray-90);
    font-weight: 600;
  `}

  :hover {
    background-color: var(--navds-color-blue-10);
  }

  :focus {
    outline: none;
    box-shadow: inset 0 0 0 3px var(--navds-color-blue-80);
  }
`;

const BackButton = styled.button`
  color: var(--navds-color-gray-90);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  text-decoration: none;
  gap: 1rem;
  border-bottom: 1px solid var(--navds-color-gray-20);
  width: 100%;
  border: none;
  background: none;
  margin: 1rem 0;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    box-shadow: inset 0 0 0 3px var(--navds-color-blue-80);
  }
`;

const IconLink = styled.a`
  color: var(--navds-color-gray-90);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  text-decoration: none;
  gap: 1rem;
  margin: 0 1rem 0 0rem;
  border-bottom: 1px solid var(--navds-color-gray-20);

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    box-shadow: inset 0 0 0 3px var(--navds-color-blue-80);
  }
`;

const DesignsystemHeader = (): JSX.Element => {
  const context = useContext(LayoutContext);
  const showLogo = useMedia("(min-width: 563px)");
  const [hambRef, setHambRef] = useState(null);
  const [openHamb, setOpenHamb] = useState(false);
  const [heading, setHeading] = useState(context.activeHeading);
  const [isHeadingMenu, setIsHeadingMenu] = useState(true);

  const [pageProps] = useContext<any>(PagePropsContext);

  useKey("Escape", () => setOpenHamb(false));

  useEffect(() => {
    setHeading(context.activeHeading);
  }, [context?.activeHeading]);

  const handleToggle = () => {
    setOpenHamb(!openHamb);
  };

  const handleClose = (e) => {
    if (
      e.target.matches(".navds-modal__overlay") ||
      !e.target.closest(".navds-popover")
    ) {
      setOpenHamb(false);
    }
  };

  const handleBack = () => {
    setIsHeadingMenu(true);
  };

  const handleSelectMenu = (heading: DsNavigationHeadingT) => {
    setHeading(heading);
    setIsHeadingMenu(false);
  };

  const nonMobile = (
    <>
      <HeadingDropDown />
      <S.Links>
        {pageProps?.navigation.headings.map((heading: DsNavigationHeadingT) => (
          <NextLink
            key={heading._key}
            href={`/${heading.link_ref?.slug?.current}`}
            passHref
          >
            <S.Link $active={context?.activeHeading?.title === heading.title}>
              {heading.title}
            </S.Link>
          </NextLink>
        ))}
        {/* <S.Link href="#">Kom i gang</S.Link>
        <S.Link href="#">Guider</S.Link>
        <S.Link href="#">Produktbrief</S.Link>
        <S.Link href="#">Styling</S.Link>
        <S.Link href="#">Komponenter</S.Link>
        <S.Link href="#">Mønster</S.Link>
        <S.Link href="#">Ressurser</S.Link>
        <S.Link href="#">Hjelp</S.Link> */}
      </S.Links>
      <HeaderSearchBar />
      <S.Link href="#">
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
      <S.Link style={{ marginLeft: "auto", marginRight: "auto" }} href="#">
        {showLogo && <NavLogoWhite focusable={false} aria-label="NAV logo" />}
        Designsystemet
      </S.Link>

      <S.DropdownButton
        className="navdsi-header__dropdown-button"
        onClick={() => handleToggle()}
        ref={setHambRef}
      >
        {openHamb ? (
          <Close
            focusable={false}
            aria-label="Steng meny ikon"
            style={{ fontSize: "1.5rem" }}
          />
        ) : (
          <Hamburger
            focusable={false}
            aria-label="Meny ikon"
            style={{ fontSize: "1.5rem" }}
          />
        )}
      </S.DropdownButton>
      <S.MenuOverlay
        onClick={(e) => handleClose(e)}
        $open={openHamb}
        className="navds-modal__overlay"
      >
        <S.MobileMenu
          open={openHamb}
          anchorEl={hambRef}
          onClose={() => null}
          placement="bottom"
          arrow={false}
          offset={0}
        >
          <NextLink href="/" passHref>
            <IconLink>
              <HomeFilled />
              <BodyShort>Tilbake til Verktøykassa</BodyShort>
            </IconLink>
          </NextLink>
          {!isHeadingMenu && (
            <BackButton onClick={() => handleBack()}>
              <Left />
              <BodyShort>Hovedmeny</BodyShort>
            </BackButton>
          )}
          {isHeadingMenu ? (
            pageProps?.navigation.headings.map(
              (heading: DsNavigationHeadingT) => (
                <Button
                  key={heading._key}
                  $active={context?.activeHeading?.title === heading.title}
                  onClick={() => handleSelectMenu(heading)}
                >
                  {heading.title}
                </Button>
              )
            )
          ) : (
            <Sidebar fromHeader heading={heading} />
          )}
        </S.MobileMenu>
      </S.MenuOverlay>
    </>
  );

  return <DsHeader>{context.isMobile ? mobile : nonMobile}</DsHeader>;
};
export default DesignsystemHeader;
