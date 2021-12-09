import { Heading } from "@navikt/ds-react";
import Head from "next/head";
import React, { useContext, useEffect, useRef } from "react";
import {
  AmplitudeEvents,
  LastUpdateTag,
  LayoutContext,
  slugger,
  StatusTag,
  TableOfContents,
  useAmplitude,
} from "../..";
import { DsArticlePage, GpArticlePage } from "../../../lib/autogen-types";
import { SanityBlockContent } from "../../SanityBlockContent";
import { useRouter } from "next/router";
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
  const { logAmplitudeEvent } = useAmplitude();
  const { asPath } = useRouter();
  const visited = useRef([]);

  useEffect(() => {
    !visited.current.includes(asPath) &&
      logAmplitudeEvent(AmplitudeEvents.sidevisning, {
        side: asPath,
      });
    visited.current = [...visited.current, asPath];
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
          </>
        )}
      </Head>
      <S.MaxWidthContainer>
        <S.HeadingContainer>
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
          <S.Inline>
            <LastUpdateTag date={data.metadata.last_update} />
            <StatusTag status={data.status} />
          </S.Inline>
        </S.HeadingContainer>
        {data.ingress && <SanityBlockContent isIngress blocks={data.ingress} />}
      </S.MaxWidthContainer>
      <S.SanityBlockContainer>
        <TableOfContents changedState={data.body} />
        <S.MaxWidthContainer>
          <SanityBlockContent withMargin blocks={data.body} />
        </S.MaxWidthContainer>
      </S.SanityBlockContainer>
    </>
  );
};

export default ActiclePageTemplate;
