import * as React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { LayoutContext, LayoutContextProps } from "./Layout";
/* import { NavLogoWhite } from "../.."; */

const StyledFooter = styled.footer<{ context: LayoutContextProps }>`
  height: 200px;
  width: 100%;
  /* background-color: var(--navds-color-gray-10); */

  padding: ${(props) => (props.context.isMobile ? "1rem" : "1rem 2rem")};
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  color: white;
  border-top: 1px solid var(--navds-color-gray-20);
`;

/* const LogoWrapper = styled.div`
  font-size: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 1rem;
`; */

function Footer(): JSX.Element {
  const context = useContext(LayoutContext);
  return null;
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
