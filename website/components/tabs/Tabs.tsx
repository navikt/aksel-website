import styled from "styled-components";
import Link from "next/link";

const Nav = styled.nav`
  margin: var(--navds-spacing-12) 0;
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
  background: none;
  padding: 0.5rem 1.5rem 0.5rem 1.5rem;
  font-weight: var(--navds-font-weight-bold);
  border-bottom: 4px solid transparent;
  cursor: pointer;

  ::hover {
    border-bottom: 4px solid var(--navds-color-darkgray);
    color: var(--navds-color-darkgray);
  }

  ::focus {
    outline: 2px solid var(--navds-color-blue-80);
    outline-offset: 2px;
  }
`;

const ActiveA = styled(A)`
  border-bottom: 4px solid var(--navds-color-blue-50);
  color: var(--navds-color-blue-50);
`;

interface TabsProps {
  tabs: { name: string; url: string }[];
  tab: number;
}

const Tabs = ({ tabs, tab }: TabsProps) => {
  return (
    <Nav aria-label="Komponent navigasjontabs">
      <Ul>
        {tabs.map((t, x) => (
          <li key={t.name + x} className={"tabs__li"}>
            <Link href={t.url} passHref>
              {x === tab ? (
                <ActiveA aria-selected={true}>{t.name}</ActiveA>
              ) : (
                <A aria-selected={false}>{t.name}</A>
              )}
            </Link>
          </li>
        ))}
      </Ul>
    </Nav>
  );
};

export default Tabs;
