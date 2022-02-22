import { ExternalLink } from "@navikt/ds-icons";
import { BodyShort, Heading, Tag } from "@navikt/ds-react";
import cl from "classnames";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { flattenBlocks } from "sanity-algolia";
import {
  AmplitudeEvents,
  Feedback,
  LastUpdateTag,
  LayoutContext,
  PagePropsContext,
  RelatedNavigation,
  slugger,
  TableOfContents,
  Tabs,
  useAmplitude,
} from "../..";
import { DsComponentPage } from "../../../lib";
import { SanityBlockContent } from "../../SanityBlockContent";

const ComponentPageTemplate = ({
  data,
  title,
}: {
  data: DsComponentPage;
  title: string;
}): JSX.Element => {
  const { query, asPath } = useRouter();
  const { pageProps } = useContext(PagePropsContext);
  const layout = useContext(LayoutContext);
  const [activeTab, setActiveTab] = useState(0);

  const { logAmplitudeEvent } = useAmplitude();

  const tabs = {
    bruk: "usage",
    design: "design",
    utvikling: "development",
    tilgjengelighet: "accessibility",
  };

  useEffect(() => {
    slugger.reset();
  });

  useEffect(() => {
    logAmplitudeEvent(AmplitudeEvents.sidevisning, {
      side: asPath,
    });
  }, [asPath]);

  /* Defaults back to a tab with content if first does not */
  useEffect(() => {
    let active = Object.keys(tabs).indexOf(query.slug?.[1] ?? "bruk");

    active = !data[tabs[Object.keys(tabs)[active]]]
      ? Object.keys(tabs).findIndex((x) => !!data[tabs[x]])
      : active;
    setActiveTab(active);
  }, [query.slug]);

  const basePath = `/designsystem/side/${query.slug[0]}`;

  const value = Object.values(tabs)?.[activeTab];
  const tabKey = Object.keys(tabs)?.[activeTab];

  useEffect(() => {
    logAmplitudeEvent(AmplitudeEvents.sidevisning, {
      side: asPath,
    });
  }, [asPath]);

  const npmPackage = data.linked_package as unknown as {
    title: string;
    github_link?: string;
    status: string;
  };

  return (
    <>
      <Head>
        <>
          <title>
            {pageProps?.page?.heading
              ? `${pageProps?.page?.heading} ${tabKey} - ${title}`
              : title}
          </title>
          <meta
            property="og:title"
            content={`${data.heading} - Designsystemet`}
          />
          {data.ingress && (
            <meta name="description" content={flattenBlocks(data.ingress)} />
          )}
        </>
      </Head>

      <div className="content-box">
        {layout?.activeHeading?.title && (
          <span className="navds-sr-only index-hidden-heading">
            {layout?.activeHeading?.title}
          </span>
        )}
        <div className="py-8">
          <div className="flex flex-wrap gap-2"></div>
          <Heading
            size="xlarge"
            level="1"
            spacing
            className="index-lvl1 flex flex-wrap items-center gap-4"
          >
            {data.heading}
            {npmPackage?.status && npmPackage.status !== "live" && (
              <Tag
                variant="info"
                size="small"
                className={cl("border-none capitalize", {
                  "bg-orange-400 capitalize text-text":
                    npmPackage.status === "alpha",
                  "bg-purple-400 text-text-inverted":
                    npmPackage.status === "beta",
                })}
              >
                {npmPackage.status}
              </Tag>
            )}
            {npmPackage?.title && (
              <Tag
                variant="info"
                size="small"
                className="border-transparent bg-gray-100 font-mono"
              >
                {npmPackage.title}
              </Tag>
            )}
          </Heading>
          <BodyShort
            as="div"
            size="small"
            className="mb-2 flex flex-wrap items-center justify-start gap-x-6 gap-y-3"
          >
            <LastUpdateTag date={data._updatedAt} />
            <div className="flex gap-x-2">
              {npmPackage?.title && (
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href={`https://yarnpkg.com/package/${npmPackage.title}`}
                  className="flex items-center gap-1 text-text underline hover:no-underline focus:bg-blue-800 focus:text-text-inverted focus:no-underline focus:shadow-focus focus:outline-none"
                >
                  Yarn
                  <ExternalLink aria-label="Gå til yarn pakke" />
                </a>
              )}
              {npmPackage?.github_link && (
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href={npmPackage.github_link}
                  className="flex items-center gap-1 text-text underline hover:no-underline focus:bg-blue-800 focus:text-text-inverted focus:no-underline focus:shadow-focus focus:outline-none"
                >
                  Kode
                  <ExternalLink aria-label="Gå til github-kode" />
                </a>
              )}
              {data.figma_link && (
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href={data.figma_link}
                  className="flex items-center gap-1 text-text underline hover:no-underline focus:bg-blue-800 focus:text-text-inverted focus:no-underline focus:shadow-focus focus:outline-none"
                >
                  Figma
                  <ExternalLink aria-label="Åpne i Figma" />
                </a>
              )}
            </div>
          </BodyShort>
        </div>
      </div>
      <Tabs
        title={data.heading}
        tabs={[
          ...Object.entries(tabs)
            .map(([key, value], i) => {
              const [first, ...rest] = key;
              return data[value]
                ? {
                    name: first.toUpperCase() + rest.join(""),
                    path: `${basePath}${key === "bruk" ? "" : "/" + key}`,
                    active:
                      activeTab === i
                        ? activeTab === i
                        : `${basePath}${key === "bruk" ? "" : "/" + key}` ===
                          new URL(asPath, "http://example.com").pathname,
                  }
                : null;
            })
            .filter((x) => !!x),
        ]}
      />
      <div className="relative flex max-w-full lg:max-w-7xl">
        <TableOfContents changedState={data[value]} />
        <div className="content-box">
          {data[value] && (
            <SanityBlockContent className="mt-12" blocks={data[value]} />
          )}
          {!data?.metadata_feedback?.hide_feedback && (
            <Feedback
              docId={pageProps?.page?._id}
              docType={pageProps?.page?._type}
            />
          )}
          <RelatedNavigation />
        </div>
      </div>
    </>
  );
};

export default ComponentPageTemplate;
