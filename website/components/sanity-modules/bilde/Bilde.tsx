/* eslint-disable @next/next/no-img-element */
import { BodyLong } from "@navikt/ds-react";
import cl from "classnames";
import React, { useState } from "react";
import { Lightbox } from "../../..";
import { Bilde as BildeT, urlFor } from "@/lib";
import { withErrorBoundary } from "@/error-boundary";
import style from "./index.module.css";

const Bilde = ({ node }: { node: BildeT }): JSX.Element => {
  if (!node || !node.asset) {
    return null;
  }

  const [open, setOpen] = useState(false);

  return (
    <>
      <figure
        className={cl("m-0 mb-8 flex flex-col", style.figure, {
          "sm:max-w-[384px]": node?.small,
        })}
      >
        <button
          aria-label="Klikk for å åpne bildet i fullskjerm"
          tabIndex={0}
          onClick={() => setOpen(!open)}
          className={cl(
            style.bilde,
            "bg-gray-50 p-0 focus:shadow-focus focus:outline-none"
          )}
        >
          <img
            alt={node.alt}
            decoding="async"
            src={urlFor(node).auto("format").url()}
            className={cl(style.bilde)}
          />
        </button>
        {node.caption && (
          <BodyLong as="figcaption" className="mt-2 self-center">
            {node.caption}
          </BodyLong>
        )}
        <Lightbox open={open} onClose={() => setOpen(false)}>
          {open && (
            <img
              alt={node.alt}
              loading="lazy"
              decoding="async"
              src={urlFor(node).auto("format").url()}
              className="object-contain"
            />
          )}
        </Lightbox>
      </figure>
    </>
  );
};

export default withErrorBoundary(Bilde, "Bilde");
