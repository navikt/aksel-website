/**
 * https://github.com/navikt/detsombetyrnoe/blob/main/src/components/PreviewBanner.tsx#L17
 */
import * as React from "react";
import styled from "styled-components";

const Style = styled.div`
  background-color: var(--navds-color-text-error);
  color: white;
  padding: 0.1rem;
  width: 8rem;
  position: fixed;
  opacity: 0.5;
  text-align: center;
  transform: translate(-5rem, 1rem) rotate(-45deg);
  font-weight: bold;
  font-size: 12px;
  z-index: 9999;
  top: 0;
  left: 3rem;
`;

function PreviewBanner({ slug }: { slug?: string }): JSX.Element {
  return (
    <Style>
      <div>Preview</div>
      {slug && <div>{slug}</div>}
    </Style>
  );
}

export default PreviewBanner;
