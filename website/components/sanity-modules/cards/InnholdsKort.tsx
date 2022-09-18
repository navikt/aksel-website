import { SanityT } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { logNav } from "@/utils";
import { Heading } from "@navikt/ds-react";
import NextLink from "next/link";

export const InnholdsKort = ({
  node,
}: {
  node: SanityT.Schema.innholdskort & { _key: string; lenke: string };
}) => {
  if (!node.title || !node.body || !node.lenke) {
    return null;
  }

  return (
    <div className="group relative mb-7 rounded-lg bg-white p-4 shadow-small focus-within:ring focus-within:ring-focus hover:shadow-medium xs:p-8">
      <NextLink href={node?.lenke} passHref>
        <a
          onClick={(e) =>
            logNav(
              "prinsipp-kort",
              window.location.pathname,
              e.currentTarget.getAttribute("href")
            )
          }
          className="before:absolute before:inset-0 focus:outline-none"
        >
          <Heading
            spacing
            size="small"
            level="3"
            id={node._key}
            className="text-deepblue-500 group-hover:underline"
          >
            {node.title}
          </Heading>
        </a>
      </NextLink>
      <SanityBlockContent blocks={node.body} noLastMargin />
    </div>
  );
};
