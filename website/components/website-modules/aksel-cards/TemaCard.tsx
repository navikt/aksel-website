import { BodyShort, Heading } from "@navikt/ds-react";
import NextLink from "next/link";
import { getTemaSlug, LongArrowRight } from "../..";
import { AkselTema } from "../../../lib";

export const TemaCard = ({ title, oppsummering }: AkselTema) => {
  return (
    <div className="group relative min-h-36 min-w-[16rem] flex-1 cursor-pointer rounded-lg border-2 border-transparent bg-white px-6 py-4 shadow-small transition-all focus-within:shadow-focus hover:scale-105 hover:shadow-medium active:border-link sm:min-h-44">
      <NextLink href={`/tema/${getTemaSlug(title)}`} passHref>
        <Heading
          as="a"
          size="medium"
          className="index-lvl2 after:absolute after:inset-0 focus:underline focus:outline-none active:text-link group-hover:underline"
        >
          {title}
        </Heading>
      </NextLink>
      {oppsummering && (
        <BodyShort className="mt-3 mb-6 text-text-muted">
          {oppsummering}
        </BodyShort>
      )}
      <LongArrowRight className="absolute bottom-4 right-6 text-gray-400 transition-all [clip-path:_polygon(45%_0,_100%_0,_100%_100%,_45%_100%)] group-focus-within:[clip-path:_polygon(25%_0,_100%_0,_100%_100%,_25%_100%)] group-hover:[clip-path:_polygon(0%_0,_100%_0,_100%_100%,_0%_100%)] group-active:text-link sm:bottom-6" />
    </div>
  );
};
