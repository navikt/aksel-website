/* eslint-disable @next/next/no-img-element */
import { BodyLong } from "@navikt/ds-react";
import React, { useState } from "react";
import { Lightbox } from "../..";
import { Picture as PictureT, urlFor } from "../../../lib";
import { withErrorBoundary } from "../../ErrorBoundary";

const Image = ({ node }: { node: PictureT }): JSX.Element => {
  if (!node || !node.asset) {
    return null;
  }

  const [open, setOpen] = useState(false);

  return (
    <figure className="m-0 mb-8 flex flex-col">
      <button
        aria-label="Klikk for å åpne bildet i fullskjerm"
        tabIndex={0}
        onClick={() => setOpen(!open)}
        className="rounded bg-gray-50 p-0 shadow-[0_0_0_1px_var(--navds-semantic-color-divider)] focus:shadow-focus focus:outline-none"
      >
        <img
          className="rounded"
          alt={node.title}
          loading="lazy"
          decoding="async"
          src={urlFor(node).auto("format").url()}
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
            className="rounded object-contain"
            alt={node.title}
            loading="lazy"
            decoding="async"
            src={urlFor(node).auto("format").url()}
          />
        )}
      </Lightbox>
    </figure>
  );
};

export default withErrorBoundary(Image, "Image");
