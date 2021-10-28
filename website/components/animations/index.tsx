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
  animation: ${fadeIn} 0.2s linear;
`;

export const ScFadeIn = styled.div`
  ${fadeInCss}
`;

export const expandKeyframes = (isTablet: boolean) =>
  isTablet
    ? keyframes`
from {
    width: 30%
  }

  to {
    width: 100%
  }
`
    : keyframes`
from {
    width: 100px
  }

  to {
    width: 500px
  }
`;
