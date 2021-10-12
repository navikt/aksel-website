import { Close, Hamburger, Left } from "@navikt/ds-icons";
import { BodyShort } from "@navikt/ds-react";
import { motion } from "framer-motion";
import NextLink from "next/link";
import * as React from "react";
import { useCallback, useContext, useEffect, useState } from "react";
import { useEvent, useKey } from "react-use";
import styled from "styled-components";
import { DsNavigationHeadingT } from "../../../../lib";
import { PagePropsContext } from "../../../../pages/_app";
import { LayoutContext, LayoutParts } from "../Layout";
import Menu from "../menu/DesignsystemMenu";
import * as S from "./header.styles";
import HeadingDropDown from "./MainDropdown";
import HeaderSearchBar from "./Searchbar";

// TODO Refactor these 3 styled comps
const Button = styled.button<{ $active?: boolean }>`
  display: flex;
  padding: 0.75rem 1rem 0.75rem 2rem;
  border: none;
  background: none;
  width: 100%;

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
  margin-bottom: 1rem;

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
  const [hambRef, setHambRef] = useState(null);
  const [menuRef, setMenuRef] = useState(null);
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

  useEvent(
    "focusin",
    useCallback(
      (e: FocusEvent) => {
        if (
          ![hambRef, menuRef].some((element) =>
            element?.contains(e.target as Node)
          )
        ) {
          setOpenHamb(false);
        }
      },
      [hambRef, menuRef]
    )
  );

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
      <HeadingDropDown title={LayoutParts[context.version].title ?? ""} />
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
      </S.Links>
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
      {/* <S.Link style={{ marginLeft: "auto", marginRight: "auto" }} href="#">
        {showLogo && <NavLogoWhite focusable={false} aria-label="NAV logo" />}
        Designsystemet
      </S.Link> */}
      <HeadingDropDown title={LayoutParts[context.version].title ?? ""} />
      <HeaderSearchBar />
      <S.DropdownButton
        className="navdsi-header__dropdown-button"
        onClick={() => handleToggle()}
        ref={setHambRef}
        aria-expanded={openHamb}
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
          ref={setMenuRef}
          anchorEl={hambRef}
          onClose={() => null}
          placement="bottom"
          arrow={false}
          offset={0}
        >
          {!isHeadingMenu && (
            <BackButton onClick={() => handleBack()}>
              <Left />
              <BodyShort>Hovedmeny</BodyShort>
            </BackButton>
          )}
          {isHeadingMenu ? (
            <motion.div
              key="MainMenuKey"
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "tween" }}
              exit={{ x: 200, opacity: 0 }}
            >
              {pageProps?.navigation.headings.map(
                (heading: DsNavigationHeadingT) => (
                  <Button
                    key={heading._key}
                    $active={context?.activeHeading?.title === heading.title}
                    onClick={() => handleSelectMenu(heading)}
                  >
                    {heading.title}
                  </Button>
                )
              )}
            </motion.div>
          ) : (
            <motion.div
              key="NestedMenuKey"
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "tween" }}
              exit={{ x: -200, opacity: 0 }}
            >
              <Menu heading={heading} />
            </motion.div>
          )}
        </S.MobileMenu>
      </S.MenuOverlay>
    </>
  );

  return <S.Header>{context.isMobile ? mobile : nonMobile}</S.Header>;
};
export default DesignsystemHeader;
