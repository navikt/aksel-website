import { FileContent } from "@navikt/ds-icons";
import { BodyShort, Heading } from "@navikt/ds-react";
import NextLink from "next/link";
import { getTemaSlug } from "../..";
import { AkselArtikkel } from "../../../lib";

export const ArtikkelCard = ({
  slug,
  source,
  heading,
  oppsummering,
}: Partial<
  AkselArtikkel & { slug: string; tema: string[]; source: string }
>) => {
  return (
    <div className="group relative flex min-h-24 min-w-[16rem] max-w-xl flex-1 cursor-pointer gap-2 rounded-lg border-2 border-transparent bg-white px-6 py-4 shadow-small transition-all focus-within:shadow-focus hover:scale-105 hover:shadow-medium active:border-link">
      <div className="flex aspect-square h-8 items-center justify-center rounded-full bg-gray-100 text-[1.25rem]">
        <FileContent aria-hidden />
      </div>
      <div>
        <NextLink
          href={{
            pathname: `/${slug}`,
            query: {
              tema: getTemaSlug(source),
            },
          }}
          passHref
        >
          <Heading
            as="a"
            size="medium"
            className="index-lvl2 after:absolute after:inset-0 focus:underline focus:outline-none active:text-link group-hover:underline"
          >
            {heading}
          </Heading>
        </NextLink>
        {oppsummering && (
          <BodyShort className="mt-1 text-text-muted">{oppsummering}</BodyShort>
        )}
      </div>
    </div>
  );
};
