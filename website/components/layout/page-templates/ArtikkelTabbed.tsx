import { Heading } from "@navikt/ds-react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {
  AmplitudeEvents,
  Feedback,
  LastUpdateTag,
  RelatedNavigation,
  slugger,
  TableOfContents,
  Tabs,
  useAmplitude,
} from "../..";
import { DsArtikkel } from "../../../lib";
import { SanityBlockContent } from "../../SanityBlockContent";

const ArtikkelTabbedTemplate = ({
  data,
  title,
}: {
  data: DsArtikkel;
  title: string;
}): JSX.Element => {
  const { query, asPath } = useRouter();
  const { logAmplitudeEvent } = useAmplitude();

  useEffect(() => {
    slugger.reset();
  });

  useEffect(() => {
    logAmplitudeEvent(AmplitudeEvents.sidevisning, {
      side: asPath,
    });
  }, [asPath]);

  if (!data.innhold_tabs || !data.heading) {
    return null;
  }
  const basePath = `/designsystem/side/${query.slug[0]}`;

  const tabs: string[] = data.innhold_tabs.map(
    (tab) => tab.title?.toLowerCase().replace(/\s+/g, "-") || "undefined"
  );
  const activeTab = query.slug[1] ? tabs.indexOf(query.slug[1]) : 0;
  const tabTitle = data?.innhold_tabs?.[activeTab]?.title;

  return (
    <>
      <Head>
        {data.heading && (
          <>
            <title>{`${data.heading} ${tabTitle ?? ""} - ${title}`}</title>
            <meta property="og:title" content={`${data.heading} - ${title}`} />
          </>
        )}
      </Head>
      <div className="content-box">
        <div className="pt-8 pb-6">
          <Heading size="xlarge" level="1" spacing className="index-lvl1">
            {data.heading}
          </Heading>
          <LastUpdateTag date={data._updatedAt} />
        </div>
      </div>
      {tabs.length > 1 && (
        <Tabs
          title={data.heading}
          tabs={[
            ...tabs
              .map((tab, i) =>
                data.innhold_tabs[i]
                  ? {
                      name: data.innhold_tabs[i].title,
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
      <div className="relative flex max-w-full lg:max-w-7xl">
        <TableOfContents changedState={data.innhold_tabs[activeTab].innhold} />
        <div className="content-box">
          <SanityBlockContent
            className="mt-12"
            blocks={data.innhold_tabs[activeTab].innhold}
          />
          {!data?.metadata_feedback?.hide_feedback && (
            <Feedback docId={data?._id} docType={data?._type} />
          )}
          <RelatedNavigation />
        </div>
      </div>
    </>
  );
};

export default ArtikkelTabbedTemplate;
