/**
 * https://github.com/navikt/detsombetyrnoe/blob/main/src/components/PreviewBanner.tsx#L17
 */
import * as React from "react";
import styled from "styled-components";

const Style = styled.div`
  background-color: var(--navds-color-text-error);
  color: white;
  padding: 0.5rem;
  width: 15rem;
  position: absolute;
  opacity: 0.5;
  text-align: center;
  transform: translate(-5rem, 1rem) rotate(-45deg);
  font-weight: bold;
`;

function PreviewBanner({ slug }) {
  return (
    <Style>
      <div>Preview</div>
      {slug && <div>{slug}</div>}
    </Style>
  );
}

export default PreviewBanner;
