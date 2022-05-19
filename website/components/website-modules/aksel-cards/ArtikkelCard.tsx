import { getTemaSlug } from "@/lib";
import { BodyShort, Heading } from "@navikt/ds-react";
import NextLink from "next/link";
import { logNav } from "../..";
import { AkselArtikkel, AkselBlogg } from "../../../lib";

export const ArtikkelCard = ({
  slug,
  source,
  heading,
  oppsummering,
}: Partial<
  (AkselArtikkel | AkselBlogg) & {
    slug: string;
    tema: string[];
    source: string;
    authors?: any[];
  }
>) => {
  return (
    <NextLink
      href={{
        pathname: `/${slug}`,
        query: {
          tema: getTemaSlug(source),
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
        className="rounded bg-white px-4 py-4 shadow focus:shadow-focus focus:outline-none md:py-5 md:px-6"
      >
        <Heading level="2" size="medium" className="hidden md:block">
          {heading}
        </Heading>
        <Heading level="2" size="small" className="block md:hidden">
          {heading}
        </Heading>
        {oppsummering && <BodyShort className="mt-1">{oppsummering}</BodyShort>}
      </a>
    </NextLink>
  );
};
