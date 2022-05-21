/* eslint-disable @next/next/no-img-element */
import { SuccessFilled, WarningFilled } from "@navikt/ds-icons";
import { BodyShort } from "@navikt/ds-react";
import cl from "classnames";
import React, { useState } from "react";
import { Lightbox } from "../../../..";
import { DoDont as DoDontT, DoDontBlock as DoDontBlockT, urlFor } from "@/lib";
import { withErrorBoundary } from "@/error-boundary";

const GetIcon = (s: string) => {
  switch (s) {
    case "do":
      return (
        <SuccessFilled
          aria-hidden
          className="mt-[1px] flex-shrink-0 text-large text-green-500"
        />
      );
    case "dont":
      return (
        <WarningFilled
          aria-hidden
          className="mt-[1px] flex-shrink-0 text-large text-red-500"
        />
      );
    case "warning":
      return (
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
          className="mt-[1px] flex-shrink-0 text-large"
        >
          <path
            d="M7.13441 2.82784C7.51957 2.16255 8.4801 2.16255 8.86526 2.82784L14.4641 12.4986C14.8501 13.1653 14.3691 13.9997 13.5987 13.9997H2.40095C1.63062 13.9997 1.14956 13.1653 1.53552 12.4986L7.13441 2.82784Z"
            fill="#FF9100"
            stroke="#FF9100"
            strokeWidth="2"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 11.3333C8.55228 11.3333 9 11.781 9 12.3333C9 12.8856 8.55228 13.3333 8 13.3333C7.44772 13.3333 7 12.8856 7 12.3333C7 11.781 7.44772 11.3333 8 11.3333ZM8.66667 4V10H7.33333V4H8.66667Z"
            fill="#262626"
          />
        </svg>
      );
    default:
      return null;
  }
};

const Element = ({ block }: { block: DoDontBlockT }): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <figure
      className={cl("flex min-w-[300px] flex-1 flex-col rounded-t", {
        "basis-full": block?.fullwidth,
        "max-w-sm": !block?.fullwidth,
      })}
    >
      <button
        className={cl(
          "rounded-t bg-gray-50 shadow-[0_0_0_1px_var(--navds-semantic-color-divider)] focus:z-[1] focus:shadow-focus focus:outline-none"
        )}
        aria-label="Klikk for å åpne bildet i fullskjerm"
        tabIndex={0}
        onClick={() => setOpen(!open)}
      >
        <img
          className="rounded-t"
          alt={block.alt}
          loading="lazy"
          decoding="async"
          src={urlFor(block.picture).auto("format").url()}
        />
      </button>
      <div
        className={cl("-ml-[1px] w-[calc(100%_+_2px)] rounded-b border-t-8", {
          "border-t-green-400": block.variant === "do",
          "border-t-red-400": block.variant === "dont",
          "border-t-orange-500": block.variant === "warning",
        })}
      />
      <figcaption data-variant={block.variant}>
        <div className="mt-3">
          {block.description && (
            <BodyShort size="small" as="span" className="inline-flex gap-2">
              {GetIcon(block.variant)}
              {block.description}
            </BodyShort>
          )}
        </div>
      </figcaption>
      <Lightbox open={open} onClose={() => setOpen(false)}>
        {open && (
          <img
            alt={block.alt}
            loading="lazy"
            decoding="async"
            src={urlFor(block.picture).auto("format").url()}
            className="object-contain"
          />
        )}
      </Lightbox>
    </figure>
  );
};

const DoDont = ({ node: { blocks } }: { node: DoDontT }) => {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="mb-8 flex flex-wrap justify-between gap-8">
      {blocks.map((x) => (
        <Element key={x._key} block={x} />
      ))}
    </div>
  );
};

export default withErrorBoundary(DoDont, "DoDont");
