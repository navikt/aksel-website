import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Nav = styled.nav`
  /* padding-bottom: 0.7rem; */
  overflow-x: auto;
  position: sticky;
  top: 0;
  z-index: 99;
  background-color: #f9f9f9;

  @media (max-width: 564px) {
    padding-right: 0;
    padding-left: 0;
  }

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

const Ul = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  max-width: 700px;
  align-items: center;
  overflow-x: auto;

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
  return (
    <Nav aria-label="Tabmeny for sideinnhold">
      <Ul role="tablist">{children}</Ul>
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
