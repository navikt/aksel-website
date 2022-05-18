import { getTemaSlug } from "@/lib";
import { BodyShort, Heading } from "@navikt/ds-react";
import NextLink from "next/link";
import { logNav } from "../..";
import { AkselTemaT } from "../../../pages";

export const TemaCard = ({ title, refCount }: AkselTemaT) => {
  return (
    <NextLink href={`/tema/${getTemaSlug(title)}`} passHref>
      <a
        className="group relative rounded-r-md bg-white shadow hover:bg-orange-100 sm:shadow-md"
        onClick={(e) =>
          logNav(
            "temakort",
            window.location.pathname,
            e.currentTarget.getAttribute("href")
          )
        }
      >
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-3 bg-deepblue-600/20 group-hover:bg-orange-300"
        />
        <div className="grid h-full justify-items-start gap-2 px-6 py-4 md:px-8 md:pt-10 md:pb-8">
          <Heading level="3" size="large" className="mb-4 md:mb-12">
            {title}
          </Heading>
          {refCount && (
            <BodyShort
              size="small"
              className="mt-auto border-t-4 border-deepblue-600/20 pt-2 uppercase opacity-80 group-hover:border-orange-300"
            >
              {refCount} artikler
            </BodyShort>
          )}
        </div>
      </a>
    </NextLink>
  );
};
