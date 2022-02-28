import { BodyLong } from "@navikt/ds-react";
import cl from "classnames";
import NextImage from "next/image";
import React, { useState } from "react";
import { useMeasure } from "react-use";
import { Lightbox } from "../..";
import { Bilde as BildeT, useSanityImage } from "../../../lib";
import { withErrorBoundary } from "../../ErrorBoundary";
import { SanityBlockContent } from "../../SanityBlockContent";

const Bilde = ({ node }: { node: BildeT }): JSX.Element => {
  if (!node || !node.asset || (node.floating && !node.floating_text)) {
    return null;
  }

  const [open, setOpen] = useState(false);

  const imageProps = useSanityImage(node);

  const [ref, { width }] = useMeasure();

  if (node.floating) {
    return (
      <div className="flow-root">
        <div
          className={cl(
            "mb-6 w-full max-w-xs rounded bg-gray-50 shadow-[0_0_0_1px_var(--navds-semantic-color-divider)] sm:w-80",
            {
              "float-none mb-6 sm:float-left sm:mr-6":
                node?.floating_align === "venstre",
              "float-none mb-6 sm:float-right sm:ml-6":
                node?.floating_align === "hoyre",
            }
          )}
        >
          <NextImage
            {...imageProps}
            className="rounded"
            layout="responsive"
            sizes="(max-width: 320px)"
            alt={node.alt}
            unoptimized
          />
        </div>
        <SanityBlockContent blocks={node.floating_text} />
      </div>
    );
  }

  return (
    <figure className="m-0 mb-8 flex flex-col">
      <button
        ref={ref}
        aria-label="Klikk for å åpne bildet i fullskjerm"
        tabIndex={0}
        onClick={() => setOpen(!open)}
        className="bg-gray-50 p-0 shadow-[0_0_0_1px_var(--navds-semantic-color-divider)] focus:shadow-focus focus:outline-none"
      >
        <NextImage
          {...imageProps}
          alt={node.alt}
          quality="100"
          layout="responsive"
          unoptimized
          sizes={
            width !== undefined
              ? `${Math.round(width)}px`
              : "(max-width: 800px)"
          }
        />
      </button>
      {node.caption && (
        <BodyLong as="figcaption" className="mt-2 self-center italic">
          {node.caption}
        </BodyLong>
      )}
      <Lightbox open={open} onClose={() => setOpen(false)}>
        {open && (
          <NextImage
            {...imageProps}
            quality="100"
            layout="fill"
            alt={node.alt}
            unoptimized
          />
        )}
      </Lightbox>
    </figure>
  );
};

export default withErrorBoundary(Bilde, "Bilde");
