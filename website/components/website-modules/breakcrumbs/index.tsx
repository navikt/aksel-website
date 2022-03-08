import { Back } from "@navikt/ds-icons";
import { Link } from "@navikt/ds-react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";

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
        <Link className="group flex w-fit items-center justify-start gap-1">
          <Back
            aria-hidden
            className="shrink-0 transition-transform group-hover:-translate-x-1"
          />
          Tilbake til{" "}
          {(router.query.tema as string).replace(/(^\w|\s\w)/g, (m) =>
            m.toUpperCase()
          )}
        </Link>
      </NextLink>
    </nav>
  );
};

export const TemaBreadcrumbs = () => (
  <nav aria-label="Til forside">
    <NextLink href="/" passHref>
      <Link className="group absolute top-3 flex flex-wrap items-center gap-1 pr-2">
        <Back
          aria-hidden
          className="shrink-0 transition-transform group-hover:-translate-x-1"
        />
        Tilbake til forsiden
      </Link>
    </NextLink>
  </nav>
);
