import { Heading } from "@navikt/ds-react";
import Head from "next/head";
import React, { useContext, useEffect } from "react";
import {
  LastUpdateTag,
  LayoutContext,
  slugger,
  StatusTag,
  TableOfContents,
} from "../..";
import { DsArticlePage, GpArticlePage } from "../../../lib/autogen-types";
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
