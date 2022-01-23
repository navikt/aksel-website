import { ExternalLink } from "@navikt/ds-icons";
import { BodyShort, Heading, Link } from "@navikt/ds-react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { flattenBlocks } from "sanity-algolia";
import styled from "styled-components";
import {
  AmplitudeEvents,
  Feedback,
  LastUpdateTag,
  LayoutContext,
  PagePropsContext,
  RelatedNavigation,
  slugger,
  StatusTag,
  TableOfContents,
  Tabs,
  useAmplitude,
} from "../..";
import { DsComponentPage } from "../../../lib";
import { SanityBlockContent } from "../../SanityBlockContent";

const ScLinks = styled.div`
  display: flex;
  column-gap: 0.5rem;
  flex-wrap: wrap;

  right: 0;
  top: 0;

  a {
    color: var(--navds-semantic-color-text-muted);

    > * {
      color: var(--navds-semantic-color-text-muted);
    }

    :hover:not(:focus) {
      color: var(--navds-semantic-color-text);
      > * {
        color: var(--navds-semantic-color-text);
      }
    }
  }
`;

const ScDiv = styled(BodyShort)`
  display: flex;
  align-items: center;
  margin-bottom: var(--navds-spacing-2);
  justify-content: flex-start;
  flex-wrap: wrap;
  column-gap: 1.5rem;
  row-gap: 0.75rem;
`;

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
  const visited = useRef([]);

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
    !visited.current.includes(asPath) &&
      logAmplitudeEvent(AmplitudeEvents.sidevisning, {
        side: asPath,
      });

    visited.current = !visited.current.includes(asPath)
      ? [...visited.current, asPath]
      : [...visited.current];
  }, [asPath]);

  /* Defaults back to a tab with content if first does not */
  useEffect(() => {
    let active = Object.keys(tabs).indexOf(query.slug[2] ?? "bruk");

    active = !data[tabs[Object.keys(tabs)[active]]]
      ? Object.keys(tabs).findIndex((x) => !!data[tabs[x]])
      : active;
    setActiveTab(active);
  }, [query.slug]);

  const basePath = `/designsystem/${(query.slug as string[])
    .slice(0, 2)
    .join("/")}`;

  const value = Object.values(tabs)?.[activeTab];
  const tabKey = Object.keys(tabs)?.[activeTab];

  useEffect(() => {
    logAmplitudeEvent(AmplitudeEvents.sidevisning, {
      side: asPath,
    });
  }, [asPath]);

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
        <div className="pt-8 pb-6">
          <StatusTag status={data.status} />
          <Heading
            size={
              layout.isTablet
                ? layout.isMobile
                  ? "large"
                  : "xlarge"
                : "2xlarge"
            }
            level="1"
            spacing
          >
            {data.heading}
          </Heading>
          <ScDiv forwardedAs="div" size="small">
            <LastUpdateTag date={data?.metadata?.last_update} />

            <ScLinks>
              {data.npm_link && (
                <Link
                  target="_blank"
                  rel="noreferrer noopener"
                  href={data.npm_link}
                >
                  NPM
                  <ExternalLink aria-label="Gå til NPM pakke" />
                </Link>
              )}
              {data.github_link && (
                <Link
                  target="_blank"
                  rel="noreferrer noopener"
                  href={data.github_link}
                >
                  Github
                  <ExternalLink aria-label="Gå til github-kode" />
                </Link>
              )}
              {data.figma_link && (
                <Link
                  target="_blank"
                  rel="noreferrer noopener"
                  href={data.figma_link}
                >
                  Figma
                  <ExternalLink aria-label="Åpne i Figma" />
                </Link>
              )}
            </ScLinks>
          </ScDiv>
        </div>
        {data.ingress && <SanityBlockContent isIngress blocks={data.ingress} />}
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
      <div className="relative max-w-full lg:max-w-7xl flex">
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
