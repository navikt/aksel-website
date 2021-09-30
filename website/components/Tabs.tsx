import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { LayoutContext } from "./templating/layout/Layout";

const Nav = styled.nav<{ isMobile: boolean }>`
  /* padding-bottom: 0.7rem; */
  overflow-x: auto;
  position: sticky;
  top: 0;
  z-index: 99;
  background-color: #f9f9f9;
  ${(props) => {
    return !props.isMobile
      ? `margin-left: 3rem;
         margin-right: auto;
         max-width: 636px;`
      : `margin: 0;
         max-width: none;
         padding-right: 0;
         padding-left: 0;`;
  }};

  ::after {
    content: "";
    background-color: var(--navds-color-gray-20);
    height: 1px;
    width: 100%;
    bottom: 0px;
    left: 0;
    z-index: -1;

    position: absolute;
  }
`;

const Ul = styled.ul<{ isMobile: boolean }>`
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  overflow-x: auto;
  max-width: ${(props) => (props.isMobile ? "" : "700px")};

  > * {
    list-style: none;
    flex: 1 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const A = styled.a`
  border-bottom: 3px solid transparent;
  background: none;
  font-weight: var(--navds-font-weight-bold);
  cursor: pointer;
  text-decoration: none;
  text-transform: capitalize;
  color: var(--navds-color-blue-50);
  flex: 1 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  min-height: 48px;

  &[aria-selected="true"] {
    border-color: var(--navds-color-blue-50);
    color: var(--navds-color-darkgray);
  }

  :hover {
    color: var(--navds-color-darkgray);
    border-color: var(--navds-color-darkgray);
  }

  :focus {
    outline: 3px solid var(--navds-color-blue-80);
    outline-offset: -3px;
  }
`;

export const Tabs = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const context = useContext(LayoutContext);
  return (
    <Nav isMobile={context.isMobile} aria-label="Tabmeny for sideinnhold">
      <Ul isMobile={context.isMobile} role="tablist">
        {children}
      </Ul>
    </Nav>
  );
};

export const Tab = ({
  children,
  path = "",
  active,
}: {
  children: React.ReactNode;
  path?: string;
  active?: boolean;
}): JSX.Element => {
  const {
    query: { preview },
    asPath,
  } = useRouter();

  return (
    <li role="presentation">
      <Link
        href={{
          pathname: path,
          query: preview ? { preview: true } : {},
        }}
        passHref
        shallow
      >
        <A
          role="tab"
          aria-selected={
            active
              ? active
              : path === new URL(asPath, "http://example.com").pathname
          }
        >
          {children}
        </A>
      </Link>
    </li>
  );
};
