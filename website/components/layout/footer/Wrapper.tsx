import React from "react";
import styled from "styled-components";
import { NavLogoWhite, ScrollTop } from "../..";
import FooterForm from "./FooterForm";

const ScFooter = styled.footer`
  position: relative;
  width: 100%;
  background-color: var(--navds-semantic-color-canvas-background-inverted);
  color: var(--navds-semantic-color-text-inverted);
  padding: 3rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ScLogoWrapper = styled.div`
  font-size: 1.5rem;
  display: inline-flex;
  align-items: center;
  height: 49px;
  margin-bottom: 4rem;
`;

const ScInner = styled.div`
  display: flex;
  row-gap: 3rem;
  column-gap: 2rem;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1280px;

  > * {
    max-width: 500px;
    flex: 1 1 400px;
  }
`;

const FooterWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ScFooter>
      <ScrollTop />
      <ScInner>
        <div>
          <ScLogoWrapper>
            <NavLogoWhite aria-hidden />
          </ScLogoWrapper>
          {children}
        </div>
        <FooterForm />
      </ScInner>
    </ScFooter>
  );
};

export default FooterWrapper;
