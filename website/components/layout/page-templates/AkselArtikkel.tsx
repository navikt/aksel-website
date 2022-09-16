import { getTemaSlug, SanityT, urlFor } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { Next } from "@navikt/ds-icons";
import { BodyShort, Heading, Ingress, Link } from "@navikt/ds-react";
import Head from "next/head";
import NextLink from "next/link";
import React from "react";
import {
  abbrName,
  BreadCrumbs,
  dateStr,
  Feedback,
  Slope,
  TableOfContents,
  UnderArbeid,
} from "../..";
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
          <BreadCrumbs href="#" text="brukerinnsikt" />
          <Heading
            level="1"
            size="xlarge"
            className="algolia-index-lvl1 hidden text-5xl text-deepblue-700 md:block"
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
              {dateStr(data?._updatedAt)}
            </BodyShort>
            {authors.length > 0 && (
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
          {hasTema && (
            <div className="mt-8 flex flex-wrap gap-2">
              {data.tema.map(({ title }: any) => (
                <span key={title}>
                  <NextLink
                    key={title}
                    href={`/tema/${getTemaSlug(title)}`}
                    passHref
                  >
                    <BodyShort
                      size="small"
                      as="a"
                      className="algolia-index-lvl5 flex min-h-8 items-center justify-center gap-[2px] rounded-full bg-gray-200 pl-4 pr-1 capitalize text-deepblue-800 no-underline hover:bg-gray-100 hover:underline focus:shadow-focus focus:outline-none"
                    >
                      {title}
                      <Next aria-hidden />
                    </BodyShort>
                  </NextLink>
                </span>
              ))}
            </div>
          )}
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
