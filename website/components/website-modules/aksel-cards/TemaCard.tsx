import { BodyShort, Heading } from "@navikt/ds-react";
import NextLink from "next/link";
import { getTemaSlug, logNav } from "../..";
import { AkselTemaT } from "../../../pages";

export const TemaCard = ({ title, oppsummering, refCount }: AkselTemaT) => {
  return (
    <div className="group relative grid min-h-36 min-w-[16rem] flex-1 cursor-pointer rounded-r-lg border-transparent bg-white px-8 py-6 shadow-small transition-all focus-within:shadow-focus hover:scale-[1.02] hover:shadow-medium active:border-link sm:min-h-44">
      <Heading size="medium" level="3">
        <NextLink href={`/tema/${getTemaSlug(title)}`} passHref>
          <a
            className="index-lvl2 after:absolute after:inset-0 focus:underline focus:outline-none active:text-link group-hover:underline"
            onClick={(e) =>
              logNav(
                "temakort",
                window.location.pathname,
                e.currentTarget.getAttribute("href")
              )
            }
          >
            {title}
          </a>
        </NextLink>
      </Heading>
      {oppsummering && (
        <BodyShort className="mt-2 mb-8 text-text-muted">
          {oppsummering}
        </BodyShort>
      )}
      <div className="grid gap-3 place-self-start">
        <div className="-mx-[1px] h-1 rounded-full bg-deepblue-200"></div>
        {refCount && (
          <p className="text-base uppercase tracking-wide text-text-muted">
            {refCount} artikler
          </p>
        )}
      </div>
      <div className="absolute inset-y-0 left-0 w-[6px] bg-deepblue-300"></div>
    </div>
  );
};
