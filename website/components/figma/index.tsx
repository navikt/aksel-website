import { Loader } from "@navikt/ds-react";
import React, { useState } from "react";
import styled from "styled-components";
import { FigmaType } from "../../lib";
import { withErrorBoundary } from "../error-boundary";

const Skeleton = styled.div`
  background-color: var(--navds-color-gray-10);
  height: 500px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Figma = ({ node }: FigmaType): JSX.Element => {
  const [loaded, setLoaded] = useState(false);

  const src = node.embed?.match(/src="(.+?)"/)?.[1];

  if (!src) return null;

  return (
    <>
      <iframe
        onLoad={() => setLoaded(true)}
        title="Figma embed frame"
        style={{
          border: "none",
          width: "100%",
          display: loaded ? "block" : "none",
        }}
        src={src || ""}
        height="500px"
      />
      {!loaded && (
        <Skeleton>
          <Loader size="2xlarge" aria-label="Laster inn Figma fil" />
        </Skeleton>
      )}
    </>
  );
};

export default withErrorBoundary(Figma, "Figma Embed");
