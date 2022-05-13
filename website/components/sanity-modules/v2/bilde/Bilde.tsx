/* eslint-disable @next/next/no-img-element */
import { BodyLong } from "@navikt/ds-react";
import cl from "classnames";
import React, { useContext, useState } from "react";
import { Lightbox } from "../../..";
import { Bilde as BildeT, urlFor } from "../../../../lib";
import { withErrorBoundary } from "../../../ErrorBoundary";
import { BlockContext } from "../../../SanityBlockContent";
import style from "./index.module.css";

const AkselBilde = ({ node }: { node: BildeT }) => {
  return (
    <figure
      className={cl("mx-auto mb-8 rounded-lg", {
        "sm:max-w-[384px]": node?.small,
      })}
    >
      <img
        alt={node.alt}
        loading="lazy"
        decoding="async"
        src={urlFor(node).auto("format").url()}
        className="bg-orange-100"
      />
      {node.caption && (
        <BodyLong as="figcaption" className="mt-2 text-center">
          {node.caption}
        </BodyLong>
      )}
    </figure>
  );
};

const Bilde = ({ node }: { node: BildeT }): JSX.Element => {
  const context = useContext(BlockContext);

  if (!node || !node.asset) {
    return null;
  }

  if (context.variant === "aksel") {
    return <AkselBilde node={node} />;
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
            "bg-gray-50 p-0 shadow-[0_0_0_1px_var(--navds-semantic-color-divider)] focus:shadow-focus focus:outline-none"
          )}
        >
          <img
            alt={node.alt}
            loading="lazy"
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
            />
          )}
        </Lightbox>
      </figure>
    </>
  );
};

export default withErrorBoundary(Bilde, "Bilde");
