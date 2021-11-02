import * as React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { LayoutContext, LayoutContextProps, LayoutParts } from "./Layout";
/* import { NavLogoWhite } from "../.."; */

const StyledFooter = styled.footer<{ context: LayoutContextProps }>`
  height: 200px;
  width: 100%;
  background-color: var(--navds-color-gray-90);

  padding: ${(props) => (props.context.isTablet ? "1rem" : "1rem 2rem")};
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  color: white;
`;

/* const LogoWrapper = styled.div`
  font-size: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 1rem;
`; */

function Footer(): JSX.Element {
  const context = useContext(LayoutContext);

  const title = LayoutParts[context.version]?.title;
  if (!title) {
    return null;
  }

  return (
    <StyledFooter context={context} className="navds-body-short">
      {/* <div></div>
      <LogoWrapper>
        <NavLogoWhite />
      </LogoWrapper> */}
    </StyledFooter>
  );
}

export default Footer;
