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
        className="group relative rounded-r-md bg-orange-100 shadow hover:bg-white focus:shadow-focus focus:outline-none sm:shadow-md"
        /* className="group relative rounded-r-md bg-white shadow hover:bg-orange-100 focus:shadow-focus focus:outline-none sm:shadow-md" */
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
          className={cl({
            "grid h-full justify-items-start gap-2 px-6 py-4 md:px-8 md:pt-10 md:pb-8":
              !compact,
            "grid h-full justify-items-start gap-2 px-6 py-4 lg:px-8 lg:pt-8 lg:pb-6":
              compact,
          })}
        >
          <Heading
            level="3"
            size={compact ? "medium" : "large"}
            className={cl("mb-4", { "md:mb-12": !compact })}
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
