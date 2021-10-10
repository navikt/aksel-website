import { Close } from "@navikt/ds-icons";
import {
  SearchField,
  SearchFieldClearButton,
  SearchFieldInput,
  useClientLayoutEffect,
} from "@navikt/ds-react";
import * as React from "react";
import { createContext, useContext, useState } from "react";
import styled from "styled-components";
import {
  DsNavigationHeadingMenuT,
  DsNavigationHeadingT,
} from "../../../../lib";
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
  overflow-y: auto;
  height: 100vh;
`;

const FormWrapper = styled.div`
  margin: 0 2rem;
`;

export const SideBarContext = createContext(null);

function Sidebar({
  fromHeader = false,
  heading,
}: {
  fromHeader?: boolean;
  heading: DsNavigationHeadingT;
}): JSX.Element {
  const context = useContext(LayoutContext);
  const [filterValue, setFilterValue] = useState("");
  const [filterTags, setFilterTags] = useState([
    { title: "Core", active: false, sanity: "core" },
    { title: "Nav.no", active: false, sanity: "nav" },
    { title: "Intern", active: false, sanity: "internal" },
  ]);

  const [sidebarMenu, setSidebarMenu] = useState<DsNavigationHeadingMenuT[]>(
    []
  );

  useClientLayoutEffect(() => {
    if (!heading || !heading?.menu) {
      return;
    }

    const filtered = heading.menu
      .filter(
        (item) =>
          item.title.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1
      )
      .filter((item) => {
        const active = filterTags.filter((x) => x.active).map((x) => x.sanity);
        return active.length > 0
          ? active.some((r) => item.link.tags.includes(r))
          : true;
      });

    setSidebarMenu([...filtered]);
  }, [heading, filterValue, filterTags]);

  if (!heading) return null;

  const sidebarContent = (
    <>
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
      <Menu menu={sidebarMenu} />
    </>
  );

  return (
    <>
      <SideBarContext.Provider value={[filterTags, setFilterTags]}>
        {fromHeader ? (
          <div>{sidebarContent}</div>
        ) : (
          <Wrapper context={context}>{sidebarContent}</Wrapper>
        )}
      </SideBarContext.Provider>
    </>
  );
}

export default Sidebar;
