import { Back } from "@navikt/ds-icons";
import { Link } from "@navikt/ds-react";
import { startCase } from "lodash";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";

export const ArtikkelBreadcrumbs = () => {
  const router = useRouter();

  if (!router.query?.tema) {
    return null;
  }

  return (
    <NextLink href={`/tema/${router.query.tema}`} passHref>
      <Link className="group absolute top-3 flex flex-wrap items-center gap-1 pr-2">
        <Back
          aria-hidden
          className="shrink-0 transition-transform group-hover:-translate-x-1"
        />
        Tilbake til {startCase(router.query.tema as string)}
      </Link>
    </NextLink>
  );
};

export const TemaBreadcrumbs = () => (
  <NextLink href="/" passHref>
    <Link className="group absolute top-3 flex flex-wrap items-center gap-1 pr-2">
      <Back
        aria-hidden
        className="shrink-0 transition-transform group-hover:-translate-x-1"
      />
      Tilbake til forsiden
    </Link>
  </NextLink>
);
