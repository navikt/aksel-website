import { Heading } from "@navikt/ds-react";
import React from "react";
import { LastUpdateTag, StatusTag, TableOfContents } from "../..";
import { DsArticlePage, GpArticlePage } from "../../../lib/autogen-types";
import { SanityBlockContent } from "../../SanityBlockContent";
import * as S from "./page.styles";

const ActiclePageTemplate = ({
  data,
}: {
  data: GpArticlePage | DsArticlePage;
}): JSX.Element => {
  if (!data.body || !data.heading || !data.status) {
    return null;
  }

  return (
    <>
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
