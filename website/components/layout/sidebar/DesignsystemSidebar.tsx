import * as React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { LayoutContext } from "../..";
import Menu from "../menu/DesignsystemMenu";

const Wrapper = styled.div`
  width: var(--sidebar-max-width);
  padding: var(--navds-spacing-8) 0;
  flex-shrink: 0;
  background-color: var(--navds-semantic-color-canvas-background-light);
  border-right: 1px solid var(--navds-semantic-color-divider);
  position: sticky;
  top: 0;
  align-self: flex-start;
  overflow-y: auto;
  height: 100vh;
  display: block;
  padding-bottom: calc(var(--navds-spacing-8) + var(--header-height));

  z-index: 1002;
  @media (max-width: 768px) {
    display: none;
  }
`;

function DesignsystemSidebar(): JSX.Element {
  const context = useContext(LayoutContext);

  if (!context?.activeHeading) return null;

  return (
    <Wrapper className="index-ignore">
      <Menu heading={context.activeHeading} />
    </Wrapper>
  );
}

export default DesignsystemSidebar;
