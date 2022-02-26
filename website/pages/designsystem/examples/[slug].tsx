import { Heading } from "@navikt/ds-react";
import Head from "next/head";
import React from "react";
import { ExampleKeys, Examples } from "../../../stories/examples";

const CodePreview = (key: string) => {
  if (!key || !(key in Examples)) {
    return null;
  }

  const Comp = Examples[key];
  return <Comp />;
};

const Page = ({ compkey }: { compkey: string }) => {
  return (
    <>
      <Head>
        <title>{`${compkey} - example`}</title>
      </Head>
      <Heading level="1" size="medium" className="navds-sr-only">
        {compkey}
      </Heading>
      <div className="flex w-full flex-col justify-center p-4">
        <div className="inline-grid flex-wrap items-center gap-4">
          {CodePreview(compkey)}
        </div>
      </div>
    </>
  );
};

export default Page;

export async function getStaticProps({ params: { slug } }) {
  return {
    props: {
      compkey: slug,
      slug: slug,
      preview: false,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      ...ExampleKeys.map((path) => ({
        params: { slug: path },
      })),
    ],
    fallback: false,
  };
}
