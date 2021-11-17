import { Close, Hamburger, Left } from "@navikt/ds-icons";
import { Heading, Detail, Popover } from "@navikt/ds-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ScFadeIn } from "../..";
import { DsNavigationHeadingT } from "../../../lib";
import { PagePropsContext } from "../../../pages/_app";
import { LayoutContext } from "../..";
import Menu from "../menu/DesignsystemMenu";
import NextLink from "next/link";
import { useMedia } from "react-use";

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
  color: var(--navds-semantic-color-text-default);
  text-decoration: none;

  ${(props) =>
    props.$active &&
    `
    box-shadow: inset 6px 0 0 0 var(--navds-semantic-color-canvas-background-inverted);
    background-color: var(--navds-global-color-gray-50);;
    color: var(--navds-semantic-color-text-default);
    font-weight: 600;
  `}

  :hover {
    background-color: var(--navds-semantic-color-canvas-background-default);
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
  color: var(--navds-semantic-color-text-default);
  display: flex;
  align-items: center;
  padding: 1rem 0.5rem;
  gap: 0.5rem;
  width: 100%;
  border: none;
  background: none;

  svg {
    font-size: 1rem;
  }

  :hover {
    text-decoration: underline;
    background-color: var(--navds-semantic-color-canvas-background-default);
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
     color: var(--navds-semantic-color-text-default);
     :hover {
       background-color: var(--navds-semantic-color-canvas-background-default);
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
  background-color: var(--navds-global-color-gray-50);
  padding: 0.5rem;
  text-transform: uppercase;
`;

const MobileNavigation = () => {
  const context = useContext(LayoutContext);
  const { pageProps } = useContext<any>(PagePropsContext);
  const [openHamb, setOpenHamb] = useState(false);
  const [heading, setHeading] = useState(context?.activeHeading);
  const [isHeadingMenu, setIsHeadingMenu] = useState(true);
  const useMobileHeader = useMedia("(max-width: 1023px)");
  const buttonRef = useRef(null);

  useEffect(() => {
    context?.activeHeading && setHeading(context.activeHeading);
  }, [context?.activeHeading]);

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
        <ScFadeIn
          style={{
            padding: "0.5rem 0",
            margin: 0,
            backgroundColor:
              "var(--navds-semantic-color-canvas-background-light)",
          }}
        >
          {openHamb && (
            <>
              <ScFadeIn hidden={!isHeadingMenu}>
                <ul>
                  {pageProps?.navigation.headings.map(
                    (heading: DsNavigationHeadingT) =>
                      useMobileHeader && !context.isTablet ? (
                        <li>
                          <NextLink
                            href={`/${heading.link_ref.slug.current}`}
                            passHref
                            key={heading._key}
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
                        </ScListItem>
                      )
                  )}
                </ul>
              </ScFadeIn>
              {heading && (
                <ScFadeIn
                  as="ul"
                  style={{ padding: "0", margin: 0 }}
                  hidden={isHeadingMenu}
                >
                  <ScTopDiv hidden={isHeadingMenu}>
                    <ScTopButton
                      onClick={() => setIsHeadingMenu(true)}
                      forwardedAs="button"
                      size="xsmall"
                    >
                      <Left />
                      Tilbake
                    </ScTopButton>
                    <ScCategory size="small">{heading.title}</ScCategory>
                  </ScTopDiv>
                  <ScMenuScroll>
                    <ScFadeIn>
                      <Menu
                        heading={heading}
                        onClick={() => setOpenHamb(false)}
                      />
                    </ScFadeIn>
                  </ScMenuScroll>
                </ScFadeIn>
              )}
            </>
          )}
        </ScFadeIn>
      </ScPopover>
      <ScOverlay data-visible={openHamb} />
    </>
  );
};

export default MobileNavigation;
