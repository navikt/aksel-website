import { BodyShort, Detail, Heading } from "@navikt/ds-react";
import moment from "moment";
import NextLink from "next/link";
import { getTemaSlug, logNav } from "../..";
import { AkselArtikkel } from "../../../lib";
import Avatar from "../avatar";
import cl from "classnames";

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
    <div className="group relative flex min-h-24 min-w-[16rem] max-w-xl flex-1 cursor-pointer flex-col justify-between  rounded-lg border-2 border-transparent bg-white px-6 py-4 shadow-small transition-all focus-within:shadow-focus hover:scale-[1.02] hover:shadow-medium active:border-link">
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
            onClick={(e) =>
              logNav(
                "artikkel-kort",
                window.location.pathname,
                e.currentTarget.getAttribute("href")
              )
            }
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
      <div
        className={cl("flex flex-row items-center gap-2", {
          "mt-4": !oppsummering,
        })}
      >
        {author ? (
          <>
            <Avatar name={author} small />
            <BodyShort size="small" as="span">
              av <span className="font-semibold">{author}</span>
              <Detail
                as="span"
                size="small"
                className="ml-2 hidden text-text-muted sm:inline-block"
              >
                {moment(_createdAt).format("DD. MMM. YY")}
              </Detail>
            </BodyShort>
          </>
        ) : (
          <Detail size="small" className="text-text-muted">
            {moment(_createdAt).format("DD. MMM. YY")}
          </Detail>
        )}
      </div>
      <Detail
        as="span"
        size="small"
        className="ml-1 mt-1 inline-block text-text-muted sm:hidden"
      >
        {moment(_createdAt).format("DD. MMM. YY")}
      </Detail>
    </div>
  );
};
