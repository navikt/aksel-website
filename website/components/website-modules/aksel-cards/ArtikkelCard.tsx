import { BodyShort, Detail, Heading } from "@navikt/ds-react";
import moment from "moment";
import NextLink from "next/link";
import { getTemaSlug } from "../..";
import { AkselArtikkel } from "../../../lib";
import Avatar from "../avatar";

export const ArtikkelCard = ({
  slug,
  source,
  heading,
  oppsummering,
  author,
  _createdAt,
}: Partial<
  AkselArtikkel & {
    slug: string;
    tema: string[];
    source: string;
    author?: string;
  }
>) => {
  return (
    <div className="group relative flex min-h-24 min-w-[16rem] max-w-xl flex-1 cursor-pointer flex-col justify-between gap-2 rounded-lg border-2 border-transparent bg-white px-6 py-4 shadow-small transition-all focus-within:shadow-focus hover:scale-105 hover:shadow-medium active:border-link">
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
          <BodyShort className="mt-1 mb-4 text-text-muted">
            {oppsummering}
          </BodyShort>
        )}
      </div>
      <div className="flex flex-col items-start gap-[2px] sm:flex-row sm:items-center sm:gap-2">
        {author ? (
          <>
            <span className="flex items-center gap-2">
              <Avatar name={author} small />
              <BodyShort size="small" as="span">
                av <strong>{author}</strong>
              </BodyShort>
            </span>
            <Detail
              size="small"
              className="ml-1 flex h-6 text-text-muted sm:ml-0"
            >
              {moment(_createdAt).format("DD. MMM. YY")}
            </Detail>
          </>
        ) : (
          <Detail size="small" className="text-text-muted">
            {moment(_createdAt).format("DD. MMM. YY")}
          </Detail>
        )}
      </div>
    </div>
  );
};