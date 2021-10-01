import { Heading } from "@navikt/ds-react";
import React from "react";
import { LastUpdateTag, StatusTag } from "../../tags";
import TableOfContents from "../../table-of-contents";
import { SanityBlockContent } from "../../SanityBlockContent";
import {
  HeadingContainer,
  Inline,
  MaxWidthContainer,
  SanityBlockContainer,
} from "../TemplateStyles";

const ActiclePageTemplate = ({ data }: { data: any }): JSX.Element => {
  if (!data.body || !data.heading || !data.status) {
    return null;
  }

  return (
    <>
      <MaxWidthContainer>
        <HeadingContainer>
          <Heading size="2xlarge" level="1" spacing>
            {data.heading}
          </Heading>
          <Inline>
            <StatusTag status={data.status} />
            <LastUpdateTag date={data.last_update} />
          </Inline>
        </HeadingContainer>
      </MaxWidthContainer>
      <SanityBlockContainer>
        <TableOfContents changedState={data.body} />
        <MaxWidthContainer>
          <SanityBlockContent withMargin blocks={data.body} />
        </MaxWidthContainer>
      </SanityBlockContainer>
    </>
  );
};

export default ActiclePageTemplate;
