import * as React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { LayoutContext, LayoutContextProps } from "../Layout";
import Menu from "../menu/DesignsystemMenu";

const Wrapper = styled.div<{ context: LayoutContextProps }>`
  width: 250px;
  padding: var(--navds-spacing-8) 0;
  position: relative;
  flex-shrink: 0;
  background-color: white;
  border-right: 1px solid var(--navds-color-gray-10);
  display: ${(props) => (props.context.isTablet ? "none" : "block")};
  position: sticky;
  top: 0;
  align-self: flex-start;
  overflow-y: auto;
  height: 100vh;
`;

function Sidebar(): JSX.Element {
  const context = useContext(LayoutContext);

  if (!context.activeHeading) return null;

  return (
    <Wrapper context={context}>
      <Menu heading={context.activeHeading} />
    </Wrapper>
  );
}

export default Sidebar;
