import { getTemaSlug, SanityT, urlFor } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { BodyShort, Heading, Ingress, Link } from "@navikt/ds-react";
import Head from "next/head";
import NextLink from "next/link";
import React from "react";
import { dateStr, Feedback, TableOfContents, UnderArbeid } from "../..";
import Footer from "../footer/Footer";
import AkselHeader from "../header/AkselHeader";

const AkselArtikkelTemplate = ({
  data,
  title,
}: {
  data: SanityT.Schema.aksel_artikkel;
  title: string;
}): JSX.Element => {
  if (!data.content || !data.heading) {
    return null;
  }

  const authors = (data?.contributors as any)?.map((x) => x?.title);

  const hasTema = "tema" in data && data.tema && data?.tema.length > 0;

  return (
    <>
      <Head>
        <title>{`${data?.heading} - ${title}`}</title>
        <meta
          property="og:title"
          content={`${data?.heading} - ${title}`}
          key="ogtitle"
        />
        <meta
          property="og:description"
          content={data?.seo?.meta ?? data?.ingress}
          key="ogdesc"
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content={
            data?.seo?.image
              ? urlFor(data?.seo?.image)
                  .width(1200)
                  .height(630)
                  .fit("crop")
                  .url()
              : ""
          }
          key="ogimage"
        />
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
                  <span key={title}>
                    {y !== 0 && `, `}
                    <NextLink
                      key={title}
                      href={`/tema/${getTemaSlug(title)}`}
                      passHref
                    >
                      <Link className="algolia-index-lvl5 text-base font-semibold uppercase text-text no-underline">
                        {title}
                      </Link>
                    </NextLink>
                  </span>
                ))}
            </div>
            <Heading
              level="1"
              size="xlarge"
              className="algolia-index-lvl1 mt-1"
            >
              {data.heading}
            </Heading>
            {data?.ingress && (
              <Ingress className="mt-4">{data?.ingress}</Ingress>
            )}
            <div className="mt-6 inline-flex flex-wrap gap-2 text-base">
              <BodyShort size="small" as="address" className="not-italic">
                {authors?.[0] ?? ""}
              </BodyShort>
              <BodyShort size="small" className="text-text-muted/40" as="span">
                {authors?.[0] && "—"}
              </BodyShort>
              <BodyShort size="small" as="span" className="text-text-muted">
                {dateStr(data?._updatedAt)}
              </BodyShort>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <TableOfContents changedState={data?.content ?? []} hideToc />
          <div className="mt-8 px-4">
            {data?.under_arbeid?.status ? (
              <>
                <UnderArbeid text={data?.under_arbeid?.forklaring} />
                {data?.under_arbeid?.vis_innhold && (
                  <SanityBlockContent
                    className="mx-auto max-w-prose xs:w-[90%]"
                    blocks={data?.content ?? []}
                    variant="aksel"
                  />
                )}
              </>
            ) : (
              <SanityBlockContent
                className="mx-auto max-w-prose xs:w-[90%]"
                blocks={data?.content ?? []}
                variant="aksel"
              />
            )}
          </div>
        </div>
        <div className="mt-16 px-4">
          <div className="mx-auto max-w-prose border-t border-gray-300 pt-8 xs:w-[90%]">
            <Feedback akselFeedback docId={data?._id} docType={data?._type} />
          </div>
        </div>
      </main>
      <Footer variant="aksel" />
    </>
  );
};

export default AkselArtikkelTemplate;
