import { ExternalLink } from "@navikt/ds-icons";
import { BodyShort, Detail, Heading } from "@navikt/ds-react";
import cl from "classnames";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AmplitudeEvents, useAmplitude } from "../..";
import { RelatertInnhold as RelatertInnholdT } from "../../../lib";
import { withErrorBoundary } from "../../ErrorBoundary";

const RelatertInnhold = ({ node }: { node: RelatertInnholdT }): JSX.Element => {
  const { logAmplitudeEvent } = useAmplitude();
  const { asPath } = useRouter();

  if (!node || node?.lenker?.length === 0) {
    return null;
  }

  const logNavigation = (e) => {
    logAmplitudeEvent(AmplitudeEvents.navigasjon, {
      kilde: "relatert-innhold",
      fra: asPath,
      til: e.currentTarget.getAttribute("href"),
    });
  };

  const getHref = (x: any): string =>
    x?.intern ? `/${x.intern_lenke}` : x.ekstern_link;

  const getTag = (x: any): string => new URL(x.ekstern_link).hostname;

  return (
    <div
      className={cl(
        "relative-child mb-16 grid gap-4 [grid-template-columns:_repeat(auto-fit,_250px)]"
      )}
    >
      {node.lenker.map((x) => (
        <div
          key={x._key}
          className="group index-ignore relative min-w-[250px] max-w-sm flex-1 cursor-pointer rounded border-2 border-transparent bg-white p-6 shadow-card focus-within:border-focus focus-within:outline-none hover:border-link"
        >
          <NextLink href={getHref(x)} passHref>
            <Heading
              size="xsmall"
              as="a"
              onClick={(e) => logNavigation(e)}
              className="mb-2 underline after:absolute after:inset-0 focus:text-link focus:outline-none group-hover:text-link group-hover:no-underline group-focus:no-underline"
            >
              {x.title}
            </Heading>
          </NextLink>
          <BodyShort size="small" className="text-text-muted">
            {x.description}
          </BodyShort>

          {x.tags !== "none" ||
            (x.ekstern_domene && (
              <Detail className="mt-6 flex items-center gap-2 uppercase text-text-muted">
                {x.ekstern_domene ? (
                  <>
                    {getTag(x)}
                    <ExternalLink aria-hidden className="-mt-[3px]" />
                  </>
                ) : (
                  x.tag
                )}
              </Detail>
            ))}
        </div>
      ))}
    </div>
  );
};

export default withErrorBoundary(RelatertInnhold, "RelatertInnhold");
