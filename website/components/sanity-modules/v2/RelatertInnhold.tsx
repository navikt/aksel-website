import { BodyShort, Detail, Heading } from "@navikt/ds-react";
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

  const getTag = (x: any): string =>
    x.tags === "custom" ? x?.tag : "Relatert Innhold";

  return (
    <div className="my-16 flex flex-wrap gap-6">
      {node.lenker.map((x) => (
        <NextLink key={x._key} href={getHref(x)}>
          <a
            onClick={(e) => logNavigation(e)}
            className="group index-ignore relative h-40 w-64 cursor-pointer rounded border-2 border-transparent bg-white p-6 shadow-card hover:border-link focus:border-focus focus:outline-none"
          >
            <Heading
              size="xsmall"
              as="div"
              className="mb-2 group-hover:text-link group-focus:text-link"
            >
              {x.title}
            </Heading>
            <BodyShort size="small" className="mb-12">
              {x.description}
            </BodyShort>
            <Detail className="absolute bottom-4 flex gap-2 uppercase text-text-muted">
              {getTag(x)}
            </Detail>
          </a>
        </NextLink>
      ))}
    </div>
  );
};

export default withErrorBoundary(RelatertInnhold, "RelatertInnhold");
