import { Back, Close, Hamburger, Next } from "@navikt/ds-icons";
import { Detail, Heading, Popover } from "@navikt/ds-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useMedia } from "react-use";
import styled from "styled-components";
import { LayoutContext, PagePropsContext } from "../..";
import { DsNavigationHeadingT } from "../../../lib";
import Menu from "../menu/DesignsystemMenu";
import NextLink from "next/link";

const ScPopover = styled(Popover)`
  border: none;
  width: 300px;
  z-index: 1100;
  position: sticky;
  box-shadow: 0 1px 3px 0 rgba(38, 38, 38, 0.2),
    0 2px 1px 0 rgba(38, 38, 38, 0.12), 0 1px 1px 0 rgba(38, 38, 38, 0.14);
  background-color: transparent;
  padding: 0;
  border-radius: 4px;

  > * {
    border-radius: 4px;
  }

  @media (max-width: 564px) {
    width: 100%;
  }

  :focus {
    box-shadow: 0 1px 3px 0 rgba(38, 38, 38, 0.2),
      0 2px 1px 0 rgba(38, 38, 38, 0.12), 0 1px 1px 0 rgba(38, 38, 38, 0.14);
  }

  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li:first-child > a {
    border-radius: 4px 4px 0 0;
  }
  li:last-child > a {
    border-radius: 0 0 4px 4px;
  }
`;

const ScOverlay = styled.div`
  width: 100vw;
  height: 100%;
  background-color: var(--navds-semantic-color-canvas-background-inverted);
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: opacity 200ms ease-in-out;
  visibility: hidden;
  z-index: 1010;

  &[data-visible="true"] {
    opacity: 0.5;
    visibility: visible;
  }
`;

const ScListItem = styled.button<{ $active?: boolean }>`
  display: flex;
  padding: 0.75rem 1rem 0.75rem 2rem;
  border: none;
  background: none;
  width: 100%;
  color: var(--navds-semantic-color-text);
  text-decoration: none;
  align-items: center;
  justify-content: space-between;
  min-height: 48px;

  ${(props) =>
    props.$active &&
    `
    border-left: 6px solid var(--navds-semantic-color-canvas-background-inverted);
    padding-left: calc(2rem - 6px);
    background-color: var(--navds-semantic-color-canvas-background);
    color: var(--navds-semantic-color-text);
    font-weight: 600;
  `}

  :hover {
    background-color: var(--navds-semantic-color-canvas-background);
  }

  :focus {
    outline: none;
    box-shadow: inset 0 0 0 3px var(--navds-semantic-color-focus);
  }
`;

const ScTopDiv = styled.div`
  margin: 0;
`;

const ScTopButton = styled(Heading)`
  color: var(--navds-semantic-color-text);
  display: flex;
  align-items: center;
  padding: 1rem 0.5rem;
  gap: 0.5rem;
  width: 100%;
  border: none;
  background: none;
  border-radius: 4px 4px 0 0;

  svg {
    font-size: 1rem;
  }

  :hover {
    text-decoration: underline;
    background-color: var(--navds-semantic-color-canvas-background);
  }

  :focus {
    outline: none;
    box-shadow: inset 0 0 0 3px var(--navds-semantic-color-focus);
  }
`;

const ScMenuScroll = styled.div`
  overflow-y: auto;
  max-height: 512px;
  margin-top: 0;
`;

const ScHamburgerButton = styled.button<{ $open: boolean }>`
  min-width: var(--header-height);
  justify-content: center;
  border: none;
  z-index: 1050;

  ${(props) =>
    props.$open &&
    `background-color: var(--navds-semantic-color-canvas-background-light);
     color: var(--navds-semantic-color-text);
     :hover {
       background-color: var(--navds-semantic-color-canvas-background);
     }
     :focus {
       box-shadow: inset 0 0 0 2px var(--navds-global-color-blue-200), inset 0 0 0 4px var(--navds-semantic-color-canvas-background-inverted);
     }
     `}
  > * {
    display: flex;

    /* Bug-fix where popover thinks svg inside button is not a child and thus closes it */
    pointer-events: none;
  }
`;

const ScCategory = styled(Detail)`
  background-color: var(--navds-semantic-color-component-background-alternate);
  padding: 0.5rem;
  text-transform: uppercase;
`;

const MobileNavigation = () => {
  const context = useContext(LayoutContext);
  const { pageProps } = useContext<any>(PagePropsContext);
  const [openHamb, setOpenHamb] = useState(false);
  const [heading, setHeading] = useState(context?.activeHeading);
  const [isHeadingMenu, setIsHeadingMenu] = useState(false);
  const useMobileHeader = useMedia("(max-width: 1023px)", false);
  const buttonRef = useRef(null);

  useEffect(() => {
    context?.activeHeading && setHeading(context.activeHeading);
  }, [context?.activeHeading]);

  useEffect(() => {
    setIsHeadingMenu(!heading || (useMobileHeader && !context.isTablet));
  }, [heading, useMobileHeader, context.isTablet]);

  return (
    <>
      <ScHamburgerButton
        ref={buttonRef}
        className="navdsi-dropdown__toggle navdsi-header__button"
        aria-haspopup="false"
        onClick={() => setOpenHamb(!openHamb)}
        aria-expanded={openHamb}
        $open={openHamb}
      >
        <span>
          {openHamb ? (
            <Close aria-label="Steng meny" style={{ fontSize: "1.5rem" }} />
          ) : (
            <Hamburger aria-label="Åpne meny" style={{ fontSize: "1.5rem" }} />
          )}
        </span>
      </ScHamburgerButton>
      <ScPopover
        onClose={() => setOpenHamb(false)}
        anchorEl={buttonRef.current}
        open={openHamb}
        arrow={false}
        placement={"bottom-start"}
        offset={8}
      >
        <div
          className="animate-fadeIn"
          style={{
            margin: 0,
            backgroundColor:
              "var(--navds-semantic-color-canvas-background-light)",
          }}
        >
          {openHamb && (
            <>
              <div hidden={!isHeadingMenu} className="animate-fadeIn">
                <ul>
                  {pageProps?.navigation.headings.map(
                    (heading: DsNavigationHeadingT) =>
                      useMobileHeader && !context.isTablet ? (
                        <li key={heading._key}>
                          <NextLink
                            href={`/${heading.link_ref.slug.current}`}
                            passHref
                          >
                            <ScListItem
                              as="a"
                              $active={
                                context
                                  ? context?.activeHeading?.title ===
                                    heading.title
                                  : false
                              }
                              onClick={() => {
                                setHeading(heading);
                                setOpenHamb(false);
                              }}
                            >
                              {heading?.title}
                            </ScListItem>
                          </NextLink>
                        </li>
                      ) : (
                        <ScListItem
                          key={heading._key}
                          $active={
                            context
                              ? context?.activeHeading?.title === heading.title
                              : false
                          }
                          onClick={() => {
                            setHeading(heading);
                            setIsHeadingMenu(false);
                          }}
                        >
                          {heading?.title}
                          <Next
                            aria-hidden
                            aria-label={`åpne ${heading?.title} menyen`}
                          />
                        </ScListItem>
                      )
                  )}
                </ul>
              </div>
              {heading && (
                <ul
                  className="animate-fadeIn"
                  style={{ padding: "0", margin: 0 }}
                  hidden={isHeadingMenu}
                >
                  <ScTopDiv hidden={isHeadingMenu}>
                    <ScTopButton
                      onClick={() => setIsHeadingMenu(true)}
                      forwardedAs="button"
                      size="xsmall"
                    >
                      <Back aria-hidden aria-label="tilbake til hovedmeny" />
                      Tilbake
                    </ScTopButton>
                    <ScCategory size="small">{heading.title}</ScCategory>
                  </ScTopDiv>
                  <ScMenuScroll className="animate-fadeIn">
                    <Menu
                      inCategory={!isHeadingMenu}
                      heading={heading}
                      onClick={() => setOpenHamb(false)}
                      mobileNavigation
                    />
                  </ScMenuScroll>
                </ul>
              )}
            </>
          )}
        </div>
      </ScPopover>
      <ScOverlay data-visible={openHamb} />
    </>
  );
};

export default MobileNavigation;
