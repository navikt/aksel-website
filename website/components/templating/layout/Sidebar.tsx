/**
 * https://github.com/navikt/detsombetyrnoe/blob/main/src/components/PreviewBanner.tsx#L17
 */
import * as React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 256px;
  position: relative;
  flex-shrink: 0;
  background-color: white;
  border-right: 1px solid var(--navds-color-gray-20);

  @media (max-width: 1068px) {
    display: none;
  }
`;

function Sidebar() {
  return <Wrapper></Wrapper>;
}

export default Sidebar;
