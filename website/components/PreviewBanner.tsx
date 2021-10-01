/**
 * https://github.com/navikt/detsombetyrnoe/blob/main/src/components/PreviewBanner.tsx#L17
 */
import * as React from "react";
import styled from "styled-components";

const Style = styled.div`
  background-color: var(--navds-color-text-error);
  color: white;
  padding: 0.5rem;
  width: 12rem;
  position: fixed;
  opacity: 0.8;
  text-align: center;
  transform: translate(-6rem, 1.5rem) rotate(-45deg);
  font-weight: bold;
  z-index: 9999;
  top: 0;
  left: 3rem;
  pointer-events: none;
`;

function PreviewBanner(): JSX.Element {
  return (
    <Style>
      <div>Preview</div>
    </Style>
  );
}

export default PreviewBanner;
