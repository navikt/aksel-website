import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

const Nav = styled.nav`
  margin: 0;
  padding-top: var(--navds-spacing-4);
  padding-bottom: 0.7rem;
  overflow-x: auto;
  position: relative;
  padding-left: var(--navds-spacing-16);
  ::after {
    content: "";
    background-color: var(--navds-color-gray-20);

    height: 1px;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 10;
    position: absolute;
    display: flex;
  }
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
