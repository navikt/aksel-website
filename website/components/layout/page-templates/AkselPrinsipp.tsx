import { SanityT, urlFor } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { BodyShort, Heading, Ingress, Label } from "@navikt/ds-react";
import Head from "next/head";
import React from "react";
import {
  abbrName,
  /* AuthenticationContext,
  AuthenticationStatus, */
  dateStr,
  Feedback,
  TableOfContents,
  UnderArbeid,
} from "../..";
import { NoSidebarLayout } from "./wrappers/NoSidebar";

const AkselPrinsippTemplate = ({
  data,
  title,
}: {
  data: SanityT.Schema.aksel_prinsipp;
  title: string;
}): JSX.Element => {
  /* const { status, login } = useContext(AuthenticationContext); */

  if (!data.content || !data.heading) {
    return null;
  }

  const authors = (data?.contributors as any)?.map((x) => x?.title);

  return (
    <>
      <Head>
        <title>{`${data?.heading} - Prinsipp - ${title}`}</title>
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
      <NoSidebarLayout>
        <div className="mx-auto mb-16 max-w-prose lg:ml-0">
          {/* <BreadCrumbs auto /> */}
          <Heading
            level="1"
            size="xlarge"
            className="algolia-index-lvl1 mt-4 hidden text-5xl text-deepblue-700 md:block"
          >
            {data.heading}
          </Heading>
          <Heading
            level="1"
            size="large"
            className="algolia-index-lvl1 block text-deepblue-700 md:hidden"
          >
            {data.heading}
          </Heading>
          {data?.ingress && (
            <Ingress className="override-text-700 mt-5 text-2xl">
              {data?.ingress}
            </Ingress>
          )}
          <div className="mt-6 flex gap-3 text-base">
            <BodyShort
              size="small"
              as="span"
              className="whitespace-nowrap text-text-muted"
            >
              {dateStr(data?.publishedAt ?? data?._updatedAt)}
            </BodyShort>
            {authors?.length > 0 && (
              <BodyShort size="small" as="div" className="flex flex-wrap gap-1">
                {authors.map(abbrName).map((x, y) => (
                  <address className="not-italic" key={x}>
                    {x}
                    {y !== authors.length - 1 && ", "}
                  </address>
                ))}
              </BodyShort>
            )}
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
            <div className="mt-12">
              <Label className="mb-2 text-deepblue-700" as="p">
                Bidragsytere
              </Label>
              {authors?.length > 0 && (
                <BodyShort as="div" className="mb-1 flex flex-wrap gap-1">
                  {authors.map(abbrName).map((x, y) => (
                    <address className="not-italic" key={x}>
                      {x}
                      {y !== authors.length - 1 && ", "}
                    </address>
                  ))}
                </BodyShort>
              )}
              <BodyShort
                as="span"
                className="whitespace-nowrap text-text-muted"
              >
                Sist oppdatert: {dateStr(data?._updatedAt)}
              </BodyShort>
            </div>
            <div className="mt-12 md:mt-16">
              <Feedback akselFeedback docId={data?._id} docType={data?._type} />
            </div>
          </div>
        </div>
      </NoSidebarLayout>
    </>
  );
};

export default AkselPrinsippTemplate;
