import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

const Nav = styled.nav`
  margin: var(--navds-spacing-12) 0;
  box-shadow: 0 2px 0 0 rgb(201, 201, 201, 0.4);
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  overflow-x: auto;
`;

const Ul = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;

  li {
    list-style: none;
  }
`;

const A = styled.a`
  color: var(--navds-color-darkgray);
  border-bottom: 4px solid transparent;
  background: none;
  padding: 0.5rem 1.5rem 0.5rem 1.5rem;
  font-weight: var(--navds-font-weight-bold);
  cursor: pointer;
  text-decoration: none;
  text-transform: capitalize;

  &[aria-selected="true"] {
    color: var(--navds-color-blue-50);
    border-bottom: 4px solid var(--navds-color-blue-50);
  }

  :hover {
    border-bottom: 4px solid var(--navds-color-darkgray);
    color: var(--navds-color-darkgray);
  }

  :focus {
    outline: 2px solid var(--navds-color-blue-80);
    outline-offset: -2px;
  }
`;

export const Tabs = ({ children }) => {
  return (
    <Nav>
      <Ul role="tablist">{children}</Ul>
    </Nav>
  );
};

export const Tab = ({
  path = "",
  children,
}: {
  path?: string;
  children: string;
}) => {
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
            path === new URL(asPath, "http://example.com").pathname
          }
        >
          {children}
        </A>
      </Link>
    </li>
  );
};
