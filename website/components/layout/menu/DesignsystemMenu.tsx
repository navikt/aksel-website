import { BodyShort, useClientLayoutEffect } from "@navikt/ds-react";
import NextLink from "next/link";
import React, { createContext, useContext, useState } from "react";
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
  }
`;

const ScLink = styled.a<{ active?: boolean }>`
  display: flex;
  padding: 0.75rem 1rem 0.75rem 2rem;
  text-decoration: none;
  color: var(--navds-color-gray-60);

  ${(props) =>
    props.active &&
    `
    box-shadow: inset 6px 0 0 0 var(--navds-color-gray-90);
    background-color: #f8f8f8;
    color: var(--navds-color-gray-90);
    font-weight: 600;
  `}

  :hover {
    background-color: #f8f8f8;
    color: var(--navds-color-gray-90);
  }

  :focus {
    outline: none;
    box-shadow: inset 0 0 0 3px var(--navds-color-blue-80);
  }
`;

export const MenuContext = createContext(null);

const Menu = ({
  heading,
  onClick,
}: {
  heading?: DsNavigationHeadingT;
  onClick?: () => void;
}): JSX.Element => {
  const { pageProps } = useContext<any>(PagePropsContext);

  const [sidebarMenu, setSidebarMenu] = useState<DsNavigationHeadingMenuT[]>(
    []
  );

  useClientLayoutEffect(() => {
    if (!heading || !heading?.menu) {
      return;
    }
    setSidebarMenu([...heading.menu]);
  }, [heading]);

  return (
    <ScNav aria-label="mobilmeny">
      <BodyShort as="ul">
        {sidebarMenu.map((item) => (
          <li key={item.title}>
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
        ))}
      </BodyShort>
    </ScNav>
  );
};

export default Menu;
