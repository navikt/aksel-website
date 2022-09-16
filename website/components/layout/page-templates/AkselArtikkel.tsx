import { getTemaSlug, SanityT, urlFor } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { BodyShort, Heading, Ingress, Link } from "@navikt/ds-react";
import Head from "next/head";
import NextLink from "next/link";
import React from "react";
import { dateStr, Feedback, Slope, TableOfContents, UnderArbeid } from "../..";
import Footer from "../footer/Footer";
import AkselHeader from "../header/AkselHeader";
import { NoSidebarLayout } from "./wrappers/NoSidebar";

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
      <NoSidebarLayout>
        <div className="mx-auto max-w-prose lg:ml-0">
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
          <Heading level="1" size="xlarge" className="algolia-index-lvl1 mt-1">
            {data.heading}
          </Heading>
          {data?.ingress && <Ingress className="mt-4">{data?.ingress}</Ingress>}
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
        <div className="relative mx-auto mt-4 max-w-prose lg:ml-0 lg:grid lg:max-w-none lg:grid-flow-row-dense lg:grid-cols-3 lg:items-start lg:gap-x-12">
          <TableOfContents
            changedState={data?.content ?? []}
            hideToc={false}
            aksel
          />
          <div className="max-w-prose lg:col-span-2 lg:col-start-1">
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
          </div>
        </div>
        <div className="mt-12 md:mt-16 lg:col-span-2 lg:col-start-1">
          <Feedback akselFeedback docId={data?._id} docType={data?._type} />
        </div>
      </NoSidebarLayout>
      <aside className="mt-16 overflow-x-clip bg-gray-50 px-4">
        <Slope />
        <div className="bg-gray-100 pb-16 xs:pb-32"></div>
      </aside>
      <Footer variant="aksel" />
    </>
  );
};

export default AkselArtikkelTemplate;
