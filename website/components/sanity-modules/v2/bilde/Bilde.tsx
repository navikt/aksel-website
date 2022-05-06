import { BodyLong } from "@navikt/ds-react";
import cl from "classnames";
import NextImage from "next/image";
import React, { useState } from "react";
import { Lightbox } from "../../..";
import { Bilde as BildeT, useSanityImage } from "../../../../lib";
import { withErrorBoundary } from "../../../ErrorBoundary";
import { SanityBlockContent } from "../../../SanityBlockContent";
import style from "./index.module.css";

const Bilde = ({ node }: { node: BildeT }): JSX.Element => {
  if (!node || !node.asset || (node.floating && !node.floating_text)) {
    return null;
  }

  const [open, setOpen] = useState(false);

  const imageProps = useSanityImage(node);

  /* if (node.floating) {
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
          />
        </div>
        <SanityBlockContent blocks={node.floating_text} />
      </div>
    );
  } */

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
            "bg-gray-50 p-0 shadow-[0_0_0_1px_var(--navds-semantic-color-divider)] focus:shadow-focus focus:outline-none"
          )}
        >
          <NextImage
            {...imageProps}
            alt={node.alt}
            quality="75"
            layout="responsive"
            className={cl(style.bilde)}
            unoptimized
          />
        </button>
        {node.caption && (
          <BodyLong as="figcaption" className="mt-2 self-center">
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
      {node?.floating_text && (
        <SanityBlockContent blocks={node.floating_text} />
      )}
    </>
  );
};

export default withErrorBoundary(Bilde, "Bilde");
