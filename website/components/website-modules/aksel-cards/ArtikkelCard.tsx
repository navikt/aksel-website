import { BodyShort, Detail, Heading } from "@navikt/ds-react";
import moment from "moment";
import NextLink from "next/link";
import { getTemaSlug, logNav } from "../..";
import { AkselArtikkel } from "../../../lib";
import Avatar from "../avatar";
import cl from "classnames";

const abbrName = (s: string) =>
  s
    .split(" ")
    .map((val, index, arr) =>
      index !== 0 && index !== arr.length - 1 ? val.charAt(0) + "." : val
    )
    .join(" ");

export const ArtikkelCard = ({
  slug,
  source,
  heading,
  oppsummering,
  authors,
  _createdAt,
}: Partial<
  AkselArtikkel & {
    slug: string;
    tema: string[];
    source: string;
    authors?: any[];
  }
>) => {
  const names = authors?.map((x) => x?.title);

  const avatars = () => {
    if (names.length === 1) {
      return <Avatar name={names[0]} small className="border border-white" />;
    }
    return (
      <ul className="flex">
        {names.map((x) => (
          <li key={x} className="-ml-3 first:ml-0 last:-mr-[1px]">
            <Avatar name={x} small className="border border-white" />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="group relative flex min-h-24 min-w-[16rem] max-w-xl flex-1 cursor-pointer flex-col justify-between  rounded-lg border-2 border-transparent bg-white px-6 py-4 shadow-small transition-all focus-within:shadow-focus hover:scale-[1.02] hover:shadow-medium active:border-link">
      <div>
        <Heading size="medium" level="3">
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
            </a>
          </NextLink>
        </Heading>
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
        {authors && authors?.length !== 0 ? (
          <>
            {avatars()}
            <BodyShort size="small" as="span">
              av <span className="font-semibold">{abbrName(names.at(-1))}</span>
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
