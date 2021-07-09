import React, { useLayoutEffect, useState } from "react";
import { Title } from "@navikt/ds-react";

import { useRouter } from "next/router";
import styled from "styled-components";
import { SanityBlockContent } from "../SanityBlockContent";
import LastUpdated from "../../LastUpdated";
import StatusTag from "../../StatusTag";
import TableOfContents from "../../TableOfContents";

const SanityContent = styled.div`
  position: relative;
  max-width: 1256px;
`;

const MaxW = styled.div`
  max-width: 700px;
  margin: 0;
  margin-right: auto;
  margin-left: var(--navds-spacing-8);
  padding: 0 var(--navds-spacing-8);
  overflow-x: auto;

  @media (max-width: 564px) {
    margin: 0;
    padding-left: var(--navds-spacing-4);
    padding-right: var(--navds-spacing-4);
  }
`;

const HeaderWrapper = styled.div`
  width: 100%;
  padding-top: 2rem;
  padding-bottom: var(--navds-spacing-6);
`;

const ActiclePageTemplate = ({ data }) => {
  const [toc, setToc] = useState([]);

  // TODO: Extract to custom hook?
  useLayoutEffect(() => {
    const tags = document.getElementsByTagName("h2");
    if (!tags) return;
    const toc = [];
    for (let item of tags) {
      toc.push({ heading: item.textContent, id: item.id });
    }
    setToc([...toc]);
  }, [data.body]);

  if (!data.body || !data.heading || !data.status) {
    return null;
  }

  return (
    <>
      <MaxW>
        <HeaderWrapper>
          <Title size="2xl" level={1} spacing>
            {data.heading}
          </Title>
          <StatusTag status={data.status} />
          <LastUpdated date={data._updatedAt} />
        </HeaderWrapper>
      </MaxW>
      <SanityContent>
        <TableOfContents toc={toc} />
        <MaxW>
          <SanityBlockContent withMargin blocks={data.body} />
        </MaxW>
      </SanityContent>
    </>
  );
};

export default ActiclePageTemplate;
