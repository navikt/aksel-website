import { Heading } from "@navikt/ds-react";
import React from "react";
import styled from "styled-components";
import { ExampleKeys, Examples } from "../../examples";

const CodePreview = (key: string) => {
  if (!key || !(key in Examples)) {
    return null;
  }

  const Comp = Examples[key];
  return <Comp />;
};

const ExampleWrapper = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const InnerWrapper = styled.div`
  gap: 1rem;
  flex-wrap: wrap;
  display: inline-grid;
  align-items: center;
`;

const Page = ({ compkey }: { compkey: string }) => {
  return (
    <>
      <Heading level="1" size="medium" className="navds-sr-only">
        {compkey}
      </Heading>
      <ExampleWrapper>
        <InnerWrapper>{CodePreview(compkey)}</InnerWrapper>
      </ExampleWrapper>
    </>
  );
};

export default Page;

export async function getStaticProps({ params: { slug } }) {
  return {
    props: {
      compkey: slug,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      ...ExampleKeys.map((path) => ({
        params: { slug: [path] },
      })),
    ],
    fallback: false,
  };
}
