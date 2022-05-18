import { getTemaSlug, SanityT } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import {
  Detail,
  Heading,
  Label,
  useClientLayoutEffect,
} from "@navikt/ds-react";
import Head from "next/head";
import NextLink from "next/link";
import React from "react";
import { dateStr, Feedback, slugger } from "../..";
import Footer from "../footer/Footer";
import AkselHeader from "../header/AkselHeader";

const AkselArtikkelTemplate = ({
  data,
  title,
}: {
  data: SanityT.Schema.aksel_artikkel | SanityT.Schema.aksel_blogg;
  title: string;
}): JSX.Element => {
  useClientLayoutEffect(() => {
    slugger.reset();
  });

  if (!data.innhold || !data.heading) {
    return null;
  }

  const authors = (data?.contributors as any)?.map((x) => x?.title);

  const hasTema = "tema" in data && data.tema && data?.tema.length > 0;

  return (
    <>
      <Head>
        <title>{`${data?.heading} - ${title}`}</title>
        <meta property="og:title" content={`${data?.heading} - ${title}`} />
        <meta property="og:type" content="article" />
      </Head>

      <AkselHeader variant="artikkel" />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className="aksel-artikkel bg-gray-50 pt-[8vw] pb-16 focus:outline-none xs:pb-32"
      >
        <div className="px-4">
          <div className="mx-auto max-w-prose xs:w-[90%]">
            <div>
              {hasTema &&
                data.tema.map(({ title }: any, y) => (
                  <>
                    {y !== 0 && `, `}
                    <NextLink
                      key={title}
                      href={`/tema/${getTemaSlug(title)}`}
                      passHref
                    >
                      <Label
                        size="small"
                        as="a"
                        className="algolia-index-lvl5 uppercase text-text hover:underline focus:underline focus:outline-none"
                      >
                        {title}
                      </Label>
                    </NextLink>
                  </>
                ))}
            </div>
            <Heading
              level="1"
              size="xlarge"
              className="algolia-index-lvl1 mt-1"
            >
              {data.heading}
            </Heading>
            <div className="mt-6">
              <Detail as="address" className="not-italic">
                {authors?.[0] ?? ""}
              </Detail>
              <Detail as="span" className="text-text-muted">
                {dateStr(data._createdAt)}
              </Detail>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <div className="mt-8 px-4">
            <SanityBlockContent
              className="mx-auto max-w-prose xs:w-[90%]"
              blocks={data?.innhold ?? []}
              variant="aksel"
            />
          </div>
        </div>
        <div className="mt-16 px-4">
          <div className="mx-auto max-w-prose border-t border-gray-300 pt-8 xs:w-[90%]">
            <Feedback akselFeedback docId={data?._id} docType={data?._type} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AkselArtikkelTemplate;
