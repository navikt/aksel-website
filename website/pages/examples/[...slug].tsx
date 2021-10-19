import React from "react";
import styled from "styled-components";
import { ExampleKeys, Examples } from "../../examples";

const CodePreview = (key) => {
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
  align-items: center;
  flex-wrap: wrap;
  display: inline-flex;
`;

const Page = ({ compkey }: { compkey: string }) => {
  return (
    <ExampleWrapper>
      <InnerWrapper>{CodePreview(compkey)}</InnerWrapper>
    </ExampleWrapper>
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
