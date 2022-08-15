/* eslint-disable @next/next/no-img-element */
import { BodyLong } from "@navikt/ds-react";
import cl from "classnames";
import React from "react";
import { Bilde as BildeT, urlFor } from "@/lib";
import { withErrorBoundary } from "@/error-boundary";
import style from "./index.module.css";

const Bilde = ({ node }: { node: BildeT }): JSX.Element => {
  if (!node || !node.asset) {
    return null;
  }

  return (
    <>
      <figure
        className={cl("m-0 mb-8 flex flex-col", style.figure, {
          "sm:max-w-[384px]": node?.small,
        })}
      >
        <div className={cl(style.bilde, "flex justify-center bg-gray-50 p-0")}>
          <img
            alt={node.alt}
            decoding="async"
            src={urlFor(node).auto("format").url()}
            className={cl(style.bilde)}
          />
        </div>
        {node.caption && (
          <figcaption className="mt-2 grid gap-1 px-4">
            <BodyLong as="span" size="small" className="self-center">
              {node.caption}
            </BodyLong>
          </figcaption>
        )}
      </figure>
    </>
  );
};

export default withErrorBoundary(Bilde, "Bilde");
