import * as React from "react";
import styled from "styled-components";
import Menu from "./Menu";

const Wrapper = styled.div`
  width: 256px;
  padding-top: var(--navds-spacing-4);
  position: relative;
  flex-shrink: 0;
  background-color: white;
  border-right: 1px solid var(--navds-color-gray-20);

  @media (max-width: 1068px) {
    display: none;
  }
`;

function Sidebar({ sidebar }: { sidebar: any }): JSX.Element {
  return (
    <>
      <Wrapper>
        {sidebar?.sidebar ? <Menu menu={sidebar.sidebar} /> : null}
      </Wrapper>
    </>
  );
}

export default Sidebar;
