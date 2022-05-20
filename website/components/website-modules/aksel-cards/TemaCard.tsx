import { getTemaSlug } from "@/lib";
import { BodyShort, Heading } from "@navikt/ds-react";
import NextLink from "next/link";
import { logNav } from "../..";
import { AkselTemaT } from "../../../pages";
import cl from "classnames";

export const TemaCard = ({
  title,
  refCount,
  compact = false,
}: AkselTemaT & { compact?: boolean }) => {
  return (
    <NextLink href={`/tema/${getTemaSlug(title)}`} passHref>
      <a
        className="group relative rounded-r-md bg-orange-100 shadow transition-colors ease-in-out hover:bg-white focus:shadow-focus focus:outline-none sm:shadow-md"
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
          className="absolute inset-y-0 left-0 w-3 bg-orange-300 group-hover:bg-deepblue-600/20"
        />
        <div
          className={cl("grid h-full justify-items-start gap-2 px-6 ", {
            "py-6 xl:px-8 xl:pt-10 xl:pb-6": !compact,
            "py-4 lg:px-8 lg:pt-8 lg:pb-6": compact,
          })}
        >
          <Heading
            level="3"
            size="medium"
            className={cl("mb-4 text-2xl xl:text-3xl", {
              "xl:mb-12": !compact,
            })}
          >
            {title}
          </Heading>
          {refCount && (
            <BodyShort
              size="small"
              className="mt-auto border-t-4 border-orange-300 pt-2 uppercase opacity-80 group-hover:border-deepblue-600/20"
            >
              {refCount} artikler
            </BodyShort>
          )}
        </div>
      </a>
    </NextLink>
  );
};
