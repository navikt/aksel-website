import cl from "classnames";
import styled from "styled-components";

/*

.tabs__buttonActive {
  border-bottom: var(--tab-border);
  color: var(--tab-color-active);
} */

const Ul = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;

  li {
    list-style: none;
  }
`;

const Button = styled.button`
  color: var(--tab-color);
  border: none;
  background: none;
  padding: 0.5rem 1.5rem 0.25rem 1.5rem;
  font-weight: var(--navds-font-weight-bold);
  border-bottom: 4px solid transparent;

  ::hover {
    border-bottom: 4px solid var(--navds-color-darkgray);
    color: var(--navds-color-darkgray);
  }

  ::focus {
    outline: var(--outline-focus);
    outline-offset: var(--outline-offset);
  }
`;

interface TabsProps {
  onChange: (tab: number) => void;
  tabs: string[];
  tab: number;
}

const Tabs = ({ onChange, tabs, tab }: TabsProps) => {
  return (
    <Ul>
      {tabs.map((t, x) => (
        <li key={t + x} className={"tabs__li"}>
          <Button
            className={cl("tabs__button", { tabs__buttonActive: x === tab })}
            onClick={() => onChange(x)}
            aria-selected={x === tab}
          >
            {t}
          </Button>
        </li>
      ))}
    </Ul>
  );
};

export default Tabs;
