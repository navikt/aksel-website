import { Loader } from "@navikt/ds-react";
import React, { useState } from "react";
import styled from "styled-components";
import { FigmaEmbed as FigmaEmbedT } from "../../lib/autogen-types";
import { withErrorBoundary } from "../error-boundary";

const Skeleton = styled.div`
  background-color: var(--navds-semantic-color-canvas-background-default);
  height: 500px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: var(--navds-spacing-7);
`;

const Figma = ({ node }: { node: FigmaEmbedT }): JSX.Element => {
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
          marginBottom: "var(--navds-spacing-7)",
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
