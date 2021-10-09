import { BodyShort } from "@navikt/ds-react";
import NextLink from "next/link";
import React, { useContext } from "react";
import styled from "styled-components";
import { DsNavigationHeadingMenuT } from "../../../../lib";
import { PagePropsContext } from "../../../../pages/_app";

const Nav = styled.nav`
  margin-top: var(--navds-spacing-6);
  overflow: scroll;

  ul,
  ul > li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

const Link = styled.a<{ active?: boolean }>`
  display: flex;
  padding: 0.75rem 1rem 0.75rem 2rem;
  text-decoration: none;

  ${(props) =>
    props.active &&
    `
    box-shadow: inset 6px 0 0 0 var(--navds-color-blue-50);
    background-color: var(--navds-color-gray-10);
    color: var(--navds-color-gray-90);
    font-weight: 600;
  `}

  :hover {
    background-color: var(--navds-color-blue-10);
  }
`;

const Menu = ({ menu }: { menu?: DsNavigationHeadingMenuT[] }): JSX.Element => {
  const [pageProps] = useContext<any>(PagePropsContext);

  return (
    <Nav>
      <BodyShort as="ul">
        {menu.map((item) => (
          <li key={item.title}>
            <NextLink href={`/${item.link.slug.current}`} passHref>
              <Link active={pageProps.page.slug === item.link.slug.current}>
                {item.title}
              </Link>
            </NextLink>
          </li>
        ))}
        {/* {Array(15).map((x) => (
          <li key={x}>
            <Link href="#">Placeholder {x}</Link>
          </li>
        ))} */}
      </BodyShort>
    </Nav>
  );
};

export default Menu;
