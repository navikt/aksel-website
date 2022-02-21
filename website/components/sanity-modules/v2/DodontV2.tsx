import { BodyShort, Heading } from "@navikt/ds-react";
import NextImage from "next/image";
import React, { useState } from "react";
import { Lightbox } from "../..";
import {
  DoDontBlock,
  DoDontV2,
  SanityKeyed,
  useSanityImage,
} from "../../../lib";
import { withErrorBoundary } from "../../ErrorBoundary";
import { SanityBlockContent } from "../../SanityBlockContent";
import cl from "classnames";

const Element = ({
  block,
}: {
  block: SanityKeyed<DoDontBlock>;
}): JSX.Element => {
  const imageProps = useSanityImage(block.picture);
  const [open, setOpen] = useState(false);

  return (
    <figure
      className={cl("flex min-w-[300px] flex-1 flex-col rounded-t", {
        "basis-full": block?.fullwidth,
        "max-w-sm": !block?.fullwidth,
      })}
    >
      <button
        className="rounded-t bg-gray-50 shadow-[0_0_0_1px_var(--navds-semantic-color-divider)] focus:z-[1] focus:shadow-focus focus:outline-none"
        aria-label="Klikk for å åpne bildet i fullskjerm"
        tabIndex={0}
        onClick={() => setOpen(!open)}
      >
        <NextImage
          {...imageProps}
          className="rounded-t"
          layout="responsive"
          sizes="(max-width: 800px)"
          alt={block.alt}
          quality="100"
        />
      </button>
      <figcaption
        data-variant={block.variant}
        className={cl("border-t-8", {
          "border-t-feedback-success-icon": block.variant === "do",
          "border-t-feedback-danger-icon": block.variant === "dont",
          "border-t-feedback-warning-icon": block.variant === "warning",
        })}
      >
        <div className="mt-3 italic">
          {block.description && (
            <BodyShort size="small" as="span">
              {block.description}
            </BodyShort>
          )}
        </div>
      </figcaption>
      <Lightbox open={open} onClose={() => setOpen(false)}>
        {open && (
          <NextImage
            {...imageProps}
            quality="100"
            layout="fill"
            alt={block.alt}
          />
        )}
      </Lightbox>
    </figure>
  );
};

const DoDont = ({ node }: { node: DoDontV2 }) => {
  if (!node || !node.title || node?.blokker.length === 0) return null;

  console.log(node);
  return (
    <div className="mb-8">
      <Heading level="3" className="index-lvl3" size="medium" spacing>
        {node.title}
      </Heading>
      <SanityBlockContent blocks={node.forklaring} />
      <div className="mb-8 flex flex-wrap justify-between gap-8">
        {node.blokker.map((x) => (
          <Element key={x._key} block={x} />
        ))}
      </div>
    </div>
  );
};

export default withErrorBoundary(DoDont, "DoDont");
