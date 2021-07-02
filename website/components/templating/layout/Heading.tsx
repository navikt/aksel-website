/**
 * https://github.com/navikt/detsombetyrnoe/blob/main/src/components/PreviewBanner.tsx#L17
 */
import * as React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  height: 56px;
  width: 100vw;
  z-index: 99;
  /* background-color: rgba(41, 41, 41, 0.98); */
  background-color: var(--navds-color-darkgray);
  grid-area: header / header / header;
  position: fixed;
  top: 0;
`;

function Header() {
  return <StyledHeader></StyledHeader>;
}

export default Header;
