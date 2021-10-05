/* import { SearchField, SearchFieldInput } from "@navikt/ds-react";
import { SearchFieldClearButton } from "@navikt/ds-react/esm/form/search-field"; */
import * as React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { LayoutContext, LayoutContextProps } from "./Layout";
import Menu from "./Menu";

const Wrapper = styled.div<{ context: LayoutContextProps }>`
  width: 256px;
  padding: var(--navds-spacing-4) var(--navds-spacing-4);
  position: relative;
  flex-shrink: 0;
  background-color: white;
  border-right: 1px solid var(--navds-color-gray-10);
  display: ${(props) => (props.context.isMobile ? "none" : "block")};
  position: sticky;
  top: 0;
`;

function Sidebar({ sidebar }: { sidebar: any }): JSX.Element {
  const context = useContext(LayoutContext);
  /* const [filterValue, setFilterValue] = useState(""); */

  return (
    <>
      <Wrapper context={context}>
        {/* <SearchField label="Filter">
          <SearchFieldInput
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
          {!!filterValue && (
            <SearchFieldClearButton onClick={() => setFilterValue("")}>
              <Close />
              <span className="navds-sr-only">Tøm filter input</span>
            </SearchFieldClearButton>
          )}
        </SearchField> */}
        {sidebar?.sidebar ? <Menu menu={sidebar.sidebar} /> : null}
      </Wrapper>
    </>
  );
}

export default Sidebar;
