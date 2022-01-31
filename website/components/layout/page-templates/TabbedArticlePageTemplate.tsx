import { Heading } from "@navikt/ds-react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { flattenBlocks } from "sanity-algolia";
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
import { DsTabbedArticlePage } from "../../../lib";
import { SanityBlockContent } from "../../SanityBlockContent";

const TabbedActiclePageTemplate = ({
  data,
  title,
}: {
  data: DsTabbedArticlePage;
  title: string;
}): JSX.Element => {
  const { query, asPath } = useRouter();
  const layout = useContext(LayoutContext);
  const { pageProps } = useContext(PagePropsContext);
  const { logAmplitudeEvent } = useAmplitude();

  useEffect(() => {
    slugger.reset();
  });

  useEffect(() => {
    logAmplitudeEvent(AmplitudeEvents.sidevisning, {
      side: asPath,
    });
  }, [asPath]);

  if (!data.tabs || !data.heading) {
    return null;
  }
  const basePath = `/designsystem/side/${query.slug[0]}`;

  const tabs: string[] = data.tabs.map(
    (tab) => tab.title?.toLowerCase().replace(/\s+/g, "-") || "undefined"
  );
  const activeTab = query.slug[1] ? tabs.indexOf(query.slug[1]) : 0;
  const tabTitle = data?.tabs?.[activeTab]?.title;

  return (
    <>
      <Head>
        {data.heading && (
          <>
            <title>{`${data.heading} ${tabTitle ?? ""} - ${title}`}</title>
            <meta property="og:title" content={`${data.heading} - ${title}`} />
            {data.ingress && (
              <meta name="description" content={flattenBlocks(data.ingress)} />
            )}
          </>
        )}
      </Head>
      <div className="content-box">
        <div className="pt-8 pb-6">
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
            className="index-lvl1"
          >
            {data.heading}
          </Heading>
          <LastUpdateTag date={data.metadata.last_update} />
        </div>
        {data.ingress && <SanityBlockContent isIngress blocks={data.ingress} />}
      </div>
      {tabs.length > 1 && (
        <Tabs
          title={data.heading}
          tabs={[
            ...tabs
              .map((tab, i) =>
                data.tabs[i]
                  ? {
                      name: data.tabs[i].title,
                      path: `${basePath}/${tab}`,
                      active:
                        activeTab === i
                          ? activeTab === i
                          : `${basePath}/${tab}` ===
                            new URL(asPath, "http://example.com").pathname,
                    }
                  : null
              )
              .filter((x) => !!x),
          ]}
        />
      )}
      <div className="relative max-w-full lg:max-w-7xl flex">
        <TableOfContents changedState={data.tabs[activeTab].body} />
        <div className="content-box">
          <SanityBlockContent
            className="mt-12"
            blocks={data.tabs[activeTab].body}
          />
          {!data.tabs[activeTab]?.metadata_feedback?.hide_feedback && (
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

export default TabbedActiclePageTemplate;
