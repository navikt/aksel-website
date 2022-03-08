import { ExternalLink } from "@navikt/ds-icons";
import { BodyShort, Detail, Heading } from "@navikt/ds-react";
import NextLink from "next/link";
import React, { useMemo } from "react";
import { logNav } from "../..";
import { RelatedLinkT, RelatedPages } from "../../../lib";
import { withErrorBoundary } from "../../ErrorBoundary";

const Card = ({ link }: { link: RelatedLinkT }) => {
  const href = link.internal ? `/${link.internal_link}` : link.external_link;

  const tag =
    (link.tags !== "main_categories" || !link.category_ref
      ? null
      : link?.category_ref?.title) ?? null;

  return (
    <div className="index-ignore group relative min-w-[250px] max-w-sm flex-1 cursor-pointer rounded border-2 border-transparent bg-white p-6 shadow-card focus-within:border-focus focus-within:outline-none hover:border-link">
      <NextLink href={href} passHref>
        <Heading
          size="xsmall"
          as="a"
          onClick={(e) =>
            logNav(
              "related-pages-card",
              window.location.pathname,
              e.currentTarget.getAttribute("href")
            )
          }
          className="underline after:absolute after:inset-0 focus:text-link focus:outline-none group-hover:text-link group-hover:no-underline group-focus:no-underline"
        >
          {link.title}
        </Heading>
      </NextLink>
      <BodyShort size="small" className="mt-2 text-text-muted">
        {link.description}
      </BodyShort>

      {tag && (
        <Detail className="mt-6 flex items-center gap-2 uppercase text-text-muted">
          {link.internal ? (
            tag
          ) : (
            <>
              EKSTERN LINK <ExternalLink aria-label="Ekstern side" />
            </>
          )}
        </Detail>
      )}
    </div>
  );
};

const RelatedPagesCard = ({ node }: { node: RelatedPages }): JSX.Element => {
  if (!node || node?.links.length === 0) {
    return null;
  }

  const links = useMemo(
    () => node.links.filter((x) => x.external_link || x.internal_link),
    [node.links]
  );

  return (
    <div className="mb-8 grid gap-4 [grid-template-columns:_repeat(auto-fit,_250px)]">
      {links.map((x) => (
        <Card key={x._key} link={x as unknown as RelatedLinkT} />
      ))}
    </div>
  );
};

export default withErrorBoundary(RelatedPagesCard, "RelatedPagesCard");
