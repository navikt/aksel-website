import { getTemaSlug, SanityT } from "@/lib";
import { BodyShort, Detail, Heading } from "@navikt/ds-react";
import NextLink from "next/link";
import { dateStr, logNav } from "../..";

export const ArtikkelCard = ({
  slug,
  source,
  heading,
  ingress,
  contributor,
  _updatedAt,
}: Partial<
  (SanityT.Schema.aksel_artikkel | SanityT.Schema.aksel_blogg) & {
    slug: string;
    tema: string[];
    source?: string;
    contributor: string | null;
  }
>) => {
  return (
    <NextLink
      href={{
        pathname: `/${slug}`,
        query: {
          ...(source ? { tema: getTemaSlug(source) } : {}),
        },
      }}
      passHref
    >
      <a
        onClick={(e) =>
          logNav(
            "artikkel-kort",
            window.location.pathname,
            e.currentTarget.getAttribute("href")
          )
        }
        className="group relative rounded bg-white p-5 pb-16 shadow-small hover:shadow-medium focus:shadow-focus focus:outline-none "
      >
        <Heading
          level="2"
          size="small"
          className="text-deepblue-700 group-hover:underline"
        >
          {heading}
        </Heading>
        {ingress && <BodyShort className="mt-2 ">{ingress}</BodyShort>}
        <span className="absolute bottom-5 flex gap-2">
          {contributor && <Detail as="span">{contributor}</Detail>}
          {contributor && (
            <Detail as="span" className="text-text-muted">
              —
            </Detail>
          )}
          <Detail as="span" className="text-text-muted">
            {dateStr(_updatedAt)}
          </Detail>
        </span>
      </a>
    </NextLink>
  );
};
