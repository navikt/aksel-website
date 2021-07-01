/**
 * https://github.com/navikt/detsombetyrnoe/blob/main/src/components/PreviewBanner.tsx#L17
 */
import * as React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  height: 56px;
  width: 100vw;
  background-color: var(--navds-color-darkgray);
`;

function Header() {
  return <StyledHeader></StyledHeader>;
}

export default Header;
