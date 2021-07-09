import * as React from "react";
import styled from "styled-components";
import Menu from "./Menu";

const Wrapper = styled.div`
  width: 256px;
  padding-top: var(--navds-spacing-4);
  position: relative;
  flex-shrink: 0;
  background-color: #fafafa;
  border-right: 1px solid var(--navds-color-gray-20);

  @media (max-width: 1068px) {
    display: none;
  }
`;

function Sidebar({ sidebar }: { sidebar: any }): JSX.Element {
  return (
    <>
      {sidebar?.sidebar ? (
        <Wrapper>
          <Menu menu={sidebar.sidebar} />
        </Wrapper>
      ) : null}
    </>
  );
}

export default Sidebar;
