import { Title } from "@navikt/ds-react";
import React from "react";
import LastUpdated from "../../LastUpdated";
import StatusTag from "../../StatusTag";
import TableOfContents from "../../TableOfContents";
import { SanityBlockContent } from "../SanityBlockContent";
import {
  HeadingContainer,
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
          <Title size="2xl" level={1} spacing>
            {data.heading}
          </Title>
          <StatusTag status={data.status} />
          <LastUpdated date={data._updatedAt} />
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
