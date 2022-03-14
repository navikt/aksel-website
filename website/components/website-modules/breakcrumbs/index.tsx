import { Back } from "@navikt/ds-icons";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { logNav } from "../..";

export const ArtikkelBreadcrumbs = () => {
  const router = useRouter();

  if (!router.query?.tema) {
    return null;
  }

  return (
    <nav
      aria-label="Til forrige tema"
      className="item-start absolute top-3 w-full px-4 sm:px-6"
    >
      <NextLink href={`/tema/${router.query.tema}`} passHref>
        <a
          className="group flex w-fit items-center justify-start gap-1 pr-1 text-text-muted underline focus:bg-blue-800 focus:text-text-inverted focus:shadow-[0_0_0_2px_theme(colors.blue-800)] focus:outline-none"
          onClick={(e) =>
            logNav(
              "breadcrumbs",
              window.location.pathname,
              e.currentTarget.getAttribute("href")
            )
          }
        >
          <Back
            aria-hidden
            className="shrink-0 transition-transform group-hover:-translate-x-1"
          />
          Tilbake til{" "}
          {(router.query.tema as string).replace(/(^\w|\s\w)/g, (m) =>
            m.toUpperCase()
          )}
        </a>
      </NextLink>
    </nav>
  );
};

export const TemaBreadcrumbs = () => (
  <nav aria-label="Til forside">
    <NextLink href="/" passHref>
      <a
        className="group absolute top-3 flex w-fit flex-wrap items-center justify-start gap-1 pr-2 text-text-muted underline focus:bg-blue-800 focus:text-text-inverted focus:shadow-[0_0_0_2px_theme(colors.blue-800)] focus:outline-none"
        onClick={(e) =>
          logNav(
            "breadcrumbs",
            window.location.pathname,
            e.currentTarget.getAttribute("href")
          )
        }
      >
        <Back
          aria-hidden
          className="shrink-0 transition-transform group-hover:-translate-x-1"
        />
        Tilbake til forsiden
      </a>
    </NextLink>
  </nav>
);
