import * as React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { LayoutContext, LayoutContextProps } from "./Layout";
import Menu from "./Menu";

const Wrapper = styled.div<{ context: LayoutContextProps }>`
  width: 256px;
  padding-top: var(--navds-spacing-4);
  position: relative;
  flex-shrink: 0;
  background-color: white;
  border-right: 1px solid var(--navds-color-gray-20);

  display: ${(props) => (props.context.isMobile ? "none" : "block")};
`;

function Sidebar({ sidebar }: { sidebar: any }): JSX.Element {
  const context = useContext(LayoutContext);

  return (
    <>
      <Wrapper context={context}>
        {sidebar?.sidebar ? <Menu menu={sidebar.sidebar} /> : null}
      </Wrapper>
    </>
  );
}

export default Sidebar;
