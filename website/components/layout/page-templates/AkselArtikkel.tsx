import { getTemaSlug, SanityT, urlFor } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { BodyShort, Heading, Ingress, Link } from "@navikt/ds-react";
import Head from "next/head";
import NextLink from "next/link";
import React from "react";
import { dateStr, Feedback, Slope, TableOfContents, UnderArbeid } from "../..";
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
        className="aksel-artikkel bg-gray-50 pt-[8vw] focus:outline-none"
      >
        <div className="mx-auto max-w-aksel xs:w-[90%]">
          <article className="pt-[4vh] pb-16 md:pb-32">
            <div className="mx-auto max-w-prose md:ml-0">
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
                {authors?.[0] && (
                  <>
                    <BodyShort size="small" as="address" className="not-italic">
                      {authors?.[0]}
                    </BodyShort>
                    <BodyShort
                      size="small"
                      className="text-text-muted/40"
                      as="span"
                    >
                      —
                    </BodyShort>
                  </>
                )}

                <BodyShort size="small" as="span" className="text-text-muted">
                  {dateStr(data?._updatedAt)}
                </BodyShort>
              </div>
            </div>
            <div className="relative mx-auto mt-3 max-w-prose md:ml-0 md:grid md:max-w-none md:grid-flow-row-dense md:grid-cols-3 md:items-start md:gap-x-12 md:border-t md:border-gray-400/25">
              <TableOfContents
                changedState={data?.content ?? []}
                hideToc={false}
                aksel
              />
              <div className="markdown mt-8 max-w-prose md:col-span-2 md:col-start-1">
                {data?.under_arbeid?.status ? (
                  <>
                    <UnderArbeid text={data?.under_arbeid?.forklaring} />
                    {data?.under_arbeid?.vis_innhold && (
                      <SanityBlockContent
                        blocks={data?.content ?? []}
                        variant="aksel"
                      />
                    )}
                  </>
                ) : (
                  <SanityBlockContent
                    blocks={data?.content ?? []}
                    variant="aksel"
                  />
                )}
                {/* <div className="dynamic-wrapper-left pt-8">
                  <Feedback
                    akselFeedback
                    docId={data?._id}
                    docType={data?._type}
                  />
                </div> */}
              </div>
            </div>
          </article>
        </div>

        {/* <article className="mx-auto relative mt-3 md:border-t md:grid md:grid-cols-3 md:gap-x-12 md:items-start md:grid-flow-row-dense md:border-gray-400/25 max-w-aksel md:ml-0 ">
          <TableOfContents
            changedState={data?.content ?? []}
            hideToc={false}
            aksel
          />
          <div className="mx-auto px-4 xs:w-[90%]">
            {data?.under_arbeid?.status ? (
              <>
                <UnderArbeid text={data?.under_arbeid?.forklaring} />
                {data?.under_arbeid?.vis_innhold && (
                  <SanityBlockContent
                    className="dynamic-wrapper-prose"
                    blocks={data?.content ?? []}
                    variant="aksel"
                  />
                )}
              </>
            ) : (
              <SanityBlockContent
                className="dynamic-wrapper-left"
                blocks={data?.content ?? []}
                variant="aksel"
              />
            )}
            <div className="dynamic-wrapper-left pt-8">
              <Feedback akselFeedback docId={data?._id} docType={data?._type} />
            </div>
          </div>
        </article> */}

        <div className="mt-16 overflow-x-clip px-4">
          <Slope />
          <div className="bg-gray-100 pb-16 xs:pb-32"></div>
        </div>
      </main>
      <Footer variant="aksel" />
    </>
  );
};

export default AkselArtikkelTemplate;
