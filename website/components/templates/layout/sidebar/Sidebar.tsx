import { Close } from "@navikt/ds-icons";
import {
  SearchField,
  SearchFieldClearButton,
  SearchFieldInput,
} from "@navikt/ds-react";
import * as React from "react";
import { createContext, useContext, useState } from "react";
import styled from "styled-components";
import { LayoutContext, LayoutContextProps } from "../Layout";
import Tags from "./FilterTags";
import Menu from "./Menu";

const Wrapper = styled.aside<{ context: LayoutContextProps }>`
  width: 288px;
  padding: var(--navds-spacing-8) 0;
  position: relative;
  flex-shrink: 0;
  background-color: white;
  border-right: 1px solid var(--navds-color-gray-10);
  display: ${(props) => (props.context.isMobile ? "none" : "block")};
  position: sticky;
  top: 0;
  align-self: flex-start;
`;

const FormWrapper = styled.div`
  margin: 0 1rem 0 2rem;
`;

export const SideBarContext = createContext(null);

function Sidebar({ sidebar }: { sidebar: any }): JSX.Element {
  const context = useContext(LayoutContext);
  const [filterValue, setFilterValue] = useState("");
  const [filterTags, setFilterTags] = useState([
    { title: "Core", active: false },
    { title: "Nav.no", active: false },
    { title: "Intern", active: false },
  ]);

  return (
    <>
      <SideBarContext.Provider value={[filterTags, setFilterTags]}>
        <Wrapper context={context}>
          <FormWrapper>
            <SearchField label="Filtrer">
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
            </SearchField>
            <Tags />
          </FormWrapper>
          <Menu />
          {/* {sidebar?.sidebar ? <Menu menu={sidebar.sidebar} /> : null} */}
        </Wrapper>
      </SideBarContext.Provider>
    </>
  );
}

export default Sidebar;
