/**
 * https://github.com/navikt/detsombetyrnoe/blob/main/src/components/PreviewBanner.tsx#L17
 */
import { useRouter } from "next/router";
import * as React from "react";
import styled from "styled-components";

const Style = styled.a`
  background-color: var(--navds-global-color-red-500);
  color: var(--navds-semantic-color-canvas-background-light);
  border: none;
  padding: 1rem;
  width: 20rem;
  position: fixed;
  opacity: 0.8;
  text-align: center;
  transform: translate(-6rem, 1.5rem) rotate(-45deg);
  font-weight: bold;
  z-index: 9999;
  top: 0.5rem;
  left: 0rem;
  text-decoration: none;

  :hover {
    background-color: var(--navds-global-color-red-300);
  }
`;

function PreviewBanner(): JSX.Element {
  const { asPath } = useRouter();

  return (
    <Style href={`/api/exit-preview?slug=${asPath}`}>
      <div>EXIT PREVIEW</div>
    </Style>
  );
}

export default PreviewBanner;
