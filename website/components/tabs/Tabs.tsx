import styled from "styled-components";
import Link from "next/link";

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
  console.log(tab);
  return (
    <nav aria-label="Komponent navigasjontabs">
      <Ul>
        {tabs.map((t, x) => (
          <li key={t.name + x} className={"tabs__li"}>
            <Link href={t.url}>
              {x === tab ? (
                <ActiveA aria-selected={true}>{t.name}</ActiveA>
              ) : (
                <A aria-selected={false}>{t.name}</A>
              )}
            </Link>
          </li>
        ))}
      </Ul>
    </nav>
  );
};

export default Tabs;
