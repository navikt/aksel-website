import styled, { css, keyframes } from "styled-components";

const fadeIn = keyframes`
from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const fadeInCss = css`
  animation: ${fadeIn} 0.2s cubic-bezier(0.65, 0, 0.35, 1);
`;

export const ScFadeIn = styled.div`
  ${fadeInCss}
`;

export const expandKeyframes = (isTablet: boolean) =>
  isTablet
    ? keyframes`
from {
  opacity: 0.2;
    width: 30%;
  }

  to {
    opacity: 1;
    width: 100%;
  }
`
    : keyframes`
from {
    opacity: 0.2;
    width: 100px;
  }

  to {
    opacity: 1;
    width: 500px;
  }
`;
