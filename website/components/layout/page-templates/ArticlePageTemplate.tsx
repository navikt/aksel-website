import { Heading } from "@navikt/ds-react";
import React, { useContext, useEffect } from "react";
import { LastUpdateTag, slugger, StatusTag, TableOfContents } from "../..";
import { DsArticlePage, GpArticlePage } from "../../../lib/autogen-types";
import Head from "next/head";
import { SanityBlockContent } from "../../SanityBlockContent";
import * as S from "./page.styles";
import { LayoutContext, LayoutParts } from "../Layout";

const ActiclePageTemplate = ({
  data,
}: {
  data: GpArticlePage | DsArticlePage;
}): JSX.Element => {
  const { version } = useContext(LayoutContext);

  useEffect(() => {
    slugger.reset();
  });

  if (!data.body || !data.heading || !data.status) {
    return null;
  }

  return (
    <>
      <Head>
        {data.heading && LayoutParts?.[version]?.title && (
          <>
            <title>{`${data.heading} - ${LayoutParts?.[version].title}`}</title>
            <meta
              property="og:title"
              content={`${data.heading} - ${LayoutParts?.[version].title}`}
            />
          </>
        )}
      </Head>
      <S.MaxWidthContainer>
        <S.HeadingContainer>
          <Heading size="2xlarge" level="1" spacing>
            {data.heading}
          </Heading>
          <S.Inline>
            <StatusTag status={data.status} />
            <LastUpdateTag date={data.metadata.last_update} />
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
