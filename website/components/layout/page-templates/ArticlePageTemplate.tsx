import { Heading } from "@navikt/ds-react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef } from "react";
import { flattenBlocks } from "sanity-algolia";
import {
  AmplitudeEvents,
  Feedback,
  LastUpdateTag,
  LayoutContext,
  slugger,
  StatusTag,
  TableOfContents,
  useAmplitude,
} from "../..";
import { DsArticlePage, GpArticlePage } from "../../../lib/autogen-types";
import { PagePropsContext } from "../../../pages/_app";
import { SanityBlockContent } from "../../SanityBlockContent";
import * as S from "./page.styles";

const ActiclePageTemplate = ({
  data,
  title,
}: {
  data: GpArticlePage | DsArticlePage;
  title: string;
}): JSX.Element => {
  useEffect(() => {
    slugger.reset();
  });

  const layout = useContext(LayoutContext);
  const { pageProps } = useContext(PagePropsContext);
  const { logAmplitudeEvent } = useAmplitude();
  const { asPath } = useRouter();
  const visited = useRef([]);

  useEffect(() => {
    !visited.current.includes(asPath) &&
      logAmplitudeEvent(AmplitudeEvents.sidevisning, {
        side: asPath,
      });
    visited.current = !visited.current.includes(asPath)
      ? [...visited.current, asPath]
      : [...visited.current];
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
      <S.MaxWidthContainer>
        <S.HeadingContainer>
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
        </S.HeadingContainer>
        {data.ingress && <SanityBlockContent isIngress blocks={data.ingress} />}
      </S.MaxWidthContainer>
      <S.SanityBlockContainer>
        <TableOfContents changedState={data.body} />
        <S.MaxWidthContainer>
          <SanityBlockContent withMargin blocks={data.body} />
          {!data?.metadata_feedback?.hide_feedback && (
            <Feedback
              docId={pageProps?.page?._id}
              docType={pageProps?.page?._type}
            />
          )}
        </S.MaxWidthContainer>
      </S.SanityBlockContainer>
    </>
  );
};

export default ActiclePageTemplate;
