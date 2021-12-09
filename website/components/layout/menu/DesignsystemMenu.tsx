import { BodyShort, Detail } from "@navikt/ds-react";
import NextLink from "next/link";
import React, { createContext, useContext, useState } from "react";
import { useIsomorphicLayoutEffect } from "react-use";
import styled from "styled-components";
import { DsNavigationHeadingMenuT, DsNavigationHeadingT } from "../../../lib";
import { PagePropsContext } from "../../../pages/_app";

const ScNav = styled.nav`
  overflow-y: auto;

  ul,
  ul > li {
    list-style: none;
    margin: 0;
    padding: 0;

    li:first-child > p {
      margin-top: 0;
      padding-top: calc(0.75rem + 2px);

      ::before {
        background-color: transparent;
      }
    }
  }

  &[data-incategory="true"] {
    li:first-child > a {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }
`;

const ScLink = styled.a<{ active?: boolean }>`
  display: flex;
  padding: 0.75rem 1rem 0.75rem 2rem;
  text-decoration: none;
  color: var(--navds-semantic-color-text-muted);

  ${(props) =>
    props.active &&
    `
    border-left: 6px solid var(--navds-semantic-color-canvas-background-inverted);
    padding-left: calc(2rem - 6px);
    background-color: var(--navds-semantic-color-canvas-background);
    color: var(--navds-semantic-color-text);
    font-weight: 600;
  `}

  :hover {
    background-color: var(--navds-semantic-color-canvas-background);
    color: var(--navds-semantic-color-text);
  }

  :focus {
    outline: none;
    box-shadow: inset 0 0 0 3px var(--navds-semantic-color-focus);
  }
`;

const ScDetail = styled(Detail)`
  text-transform: uppercase;
  padding: 1.75rem 1rem calc(0.75rem + 2px) 2rem;
  margin-top: 24px;
  color: var(--navds-semantic-color-text);
  position: relative;

  ::before {
    content: "";
    top: 0;
    left: auto;
    right: auto;
    position: absolute;
    background-color: var(--navds-semantic-color-divider);
    width: 75%;
    height: 1px;
  }
`;

export const MenuContext = createContext(null);

const Menu = ({
  heading,
  onClick,
  inCategory,
}: {
  heading?: DsNavigationHeadingT;
  onClick?: () => void;
  inCategory?: boolean;
}): JSX.Element => {
  const { pageProps } = useContext<any>(PagePropsContext);

  const [sidebarMenu, setSidebarMenu] = useState<DsNavigationHeadingMenuT[]>(
    []
  );

  useIsomorphicLayoutEffect(() => {
    if (!heading || !heading?.menu) {
      return;
    }
    setSidebarMenu([...heading.menu]);
  }, [heading]);

  return (
    <ScNav aria-label={heading.title} data-incategory={inCategory}>
      <BodyShort as="ul">
        {sidebarMenu.map((item, x) => {
          if (item._type === "subheading") {
            return (
              <li key={item.title + x}>
                <ScDetail size="small">{item.title}</ScDetail>
              </li>
            );
          }
          return (
            <li key={item.title + x}>
              <NextLink href={`/${item.link.slug.current}`} passHref>
                <ScLink
                  onClick={() => {
                    onClick && onClick();
                  }}
                  active={
                    pageProps?.page
                      ? pageProps.page.slug === item.link.slug.current
                      : false
                  }
                >
                  {item.title}
                </ScLink>
              </NextLink>
            </li>
          );
        })}
      </BodyShort>
    </ScNav>
  );
};

export default Menu;
