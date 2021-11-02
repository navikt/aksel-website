import { Close, Hamburger, Left } from "@navikt/ds-icons";
import { Heading } from "@navikt/ds-react";
import { Dropdown, Header } from "@navikt/ds-react-internal";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ScFadeIn } from "../..";
import { DsNavigationHeadingT } from "../../../lib";
import { PagePropsContext } from "../../../pages/_app";
import { LayoutContext } from "../Layout";
import Menu from "../menu/DesignsystemMenu";

const ScMenu = styled(Dropdown.Menu)<{ $isMobile: boolean }>`
  border: none;
  width: 300px;
  z-index: 1003;
  position: sticky;
  box-shadow: 0 0 10px 0 rgba(24, 39, 75, 0.1), 0 0 6px 0 rgba(24, 39, 75, 0.12);
  ${(props) => props.$isMobile && `width: 100%;`}
  background-color: transparent;
  padding: 0;

  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

const ScListItem = styled(Dropdown.Menu.List.Item)<{ $active?: boolean }>`
  display: flex;
  padding: 0.75rem 1rem 0.75rem 2rem;
  border: none;
  background: none;
  width: 100%;
  color: var(--navds-color-gray-90);

  ${(props) =>
    props.$active &&
    `
    box-shadow: inset 6px 0 0 0 var(--navds-color-gray-90);
    background-color: #f8f8f8;
    color: var(--navds-color-gray-90);
    font-weight: 600;
  `}

  :hover {
    background-color: var(--navds-color-gray-10);
  }

  :focus {
    outline: none;
    box-shadow: inset 0 0 0 3px var(--navds-color-blue-80);
  }
`;

const ScTopDiv = styled.div`
  border-bottom: 1px solid var(--navds-color-gray-20);
  margin: 0;
`;

const ScTopButton = styled(Heading)`
  color: var(--navds-color-gray-90);
  display: flex;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  border-bottom: 1px solid var(--navds-color-gray-20);
  width: 100%;
  border: none;
  background: none;
  margin-bottom: 0.5rem;

  :hover {
    text-decoration: underline;
    background-color: var(--navds-color-gray-10);
  }

  :focus {
    outline: none;
    box-shadow: inset 0 0 0 3px var(--navds-color-blue-80);
  }
`;

const ScMenuScroll = styled.div`
  overflow-y: auto;
  max-height: 512px;
  margin-top: 0;
`;

const ScHamburgerButton = styled(Header.Button)<{ $open: boolean }>`
  min-width: var(--header-height);
  justify-content: center;
  border: none;

  ${(props) =>
    props.$open &&
    `background-color: white;
     color: var(--navds-color-gray-90);
     :hover {
       background-color: var(--navds-color-gray-10);
     }
     :focus {
       box-shadow: inset 0 0 0 2px var(--navds-color-blue-20), inset 0 0 0 4px var(--navds-color-gray-90);
     }
     `}
  > * {
    display: flex;
    /* Bug-fix where popover thinks svg inside button is not a child and thus closes it */
    pointer-events: none;
  }
`;

const MobileNavigation = () => {
  const context = useContext(LayoutContext);
  const { pageProps } = useContext<any>(PagePropsContext);
  const [openHamb, setOpenHamb] = useState(false);
  const [heading, setHeading] = useState(context.activeHeading);
  const [isHeadingMenu, setIsHeadingMenu] = useState(true);

  useEffect(() => {
    setHeading(context.activeHeading);
  }, [context?.activeHeading]);

  return (
    <Dropdown>
      <ScHamburgerButton
        forwardedAs={Dropdown.Toggle}
        onClick={() => setOpenHamb(!openHamb)}
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
      <ScMenu
        $isMobile={context.isMobile}
        onClose={() => {
          setOpenHamb(false);
        }}
      >
        <ScFadeIn
          style={{
            padding: "0.5rem 0",
            margin: 0,
            backgroundColor: "white",
          }}
        >
          {openHamb && (
            <>
              <ScFadeIn
                hidden={!isHeadingMenu}
                style={{ padding: "2rem 0", margin: 0 }}
              >
                {pageProps?.navigation.headings.map(
                  (heading: DsNavigationHeadingT) => (
                    <ScListItem
                      key={heading.title}
                      $active={context?.activeHeading?.title === heading.title}
                      onClick={() => {
                        setHeading(heading);
                        setIsHeadingMenu(false);
                      }}
                    >
                      {heading.title}
                    </ScListItem>
                  )
                )}
              </ScFadeIn>
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
                    {context?.activeHeading?.title}
                  </ScTopButton>
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
            </>
          )}
        </ScFadeIn>
      </ScMenu>
    </Dropdown>
  );
};

export default MobileNavigation;
