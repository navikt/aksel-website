import { Heading, useClientLayoutEffect } from "@navikt/ds-react";
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
  useAmplitude,
} from "../..";
import { DsArticlePage, GpArticlePage } from "../../../lib";
import { SanityBlockContent } from "../../SanityBlockContent";

const ActiclePageTemplate = ({
  data,
  title,
}: {
  data: GpArticlePage | DsArticlePage;
  title: string;
}): JSX.Element => {
  const layout = useContext(LayoutContext);
  const { pageProps } = useContext(PagePropsContext);
  const { logAmplitudeEvent } = useAmplitude();
  const { asPath } = useRouter();

  useClientLayoutEffect(() => {
    slugger.reset();
  });

  useEffect(() => {
    logAmplitudeEvent(AmplitudeEvents.sidevisning, {
      side: asPath,
    });
  }, [asPath]);

  if (!data.body || !data.heading || !data.status) {
    return null;
  }

  return (
    <>
      <Head>
        {data.heading && (
          <>
            <title>{`${data.heading} - ${title}`}</title>
            <meta property="og:title" content={`${data.heading} - ${title}`} />
            {data.ingress && (
              <meta name="description" content={flattenBlocks(data.ingress)} />
            )}
          </>
        )}
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
          <LastUpdateTag date={data.metadata.last_update} />
        </div>
        {data.ingress && <SanityBlockContent isIngress blocks={data.ingress} />}
      </div>
      <div className="relative max-w-full lg:max-w-7xl flex">
        <TableOfContents changedState={data.body} />
        <div className="content-box">
          <SanityBlockContent className="mt-12" blocks={data.body} />
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

export default ActiclePageTemplate;
