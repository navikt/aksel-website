import { BodyLong, ReadMore } from "@navikt/ds-react";
import cl from "classnames";
import React from "react";
import { withErrorBoundary } from "../../ErrorBoundary";

const Video = ({
  node,
}: {
  node: {
    alt: string;
    webm: { extension: string; url: string } | null;
    fallback: { extension: string; url: string } | null;
    transkripsjon?: string;
    caption?: string;
  };
}): JSX.Element => {
  if (!node || (!node.webm && !node.fallback)) {
    return null;
  }

  console.log(node);

  return (
    <figure className={cl("m-0 mb-8 flex flex-col gap-2")}>
      <video title={node.alt} playsInline controls loop>
        <source src={node.webm.url} type={`video/${node.webm.extension}`} />
        <source
          src={node.fallback.url}
          type={`video/${node.fallback.extension}`}
        />
      </video>
      {node.caption && (
        <BodyLong as="figcaption" className="self-center italic">
          {node.caption}
        </BodyLong>
      )}
      {node.transkripsjon && (
        <ReadMore header="Les video transkripsjon" className="ml-[2px]">
          {node.transkripsjon}
        </ReadMore>
      )}
    </figure>
  );
};

export default withErrorBoundary(Video, "Video");
