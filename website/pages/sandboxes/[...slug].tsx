import { Heading } from "@navikt/ds-react";
import Head from "next/head";
import React from "react";
import Sandbox from "../../components/sanity-modules/sandbox";
import { SandboxKeys, Sandboxes } from "../../stories/sandbox";

const CodePreview = (key: string) => {
  if (!key || !(key in Sandboxes)) {
    return null;
  }

  const node: any = {
    _type: "ds_code_sandbox",
    title: key,
    _id: "",
    _createdAt: "",
    _rev: "",
    _updatedAt: "",
  };
  return (
    <>
      <Head>
        <title>{`${key} - sandbox`}</title>
      </Head>
      <Heading level="1" size="medium" className="navds-sr-only">
        {key}
      </Heading>
      <Sandbox node={node} />;
    </>
  );
};

const Page = ({ compkey }: { compkey: string }) => {
  return CodePreview(compkey);
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
      ...SandboxKeys.map((path) => ({
        params: { slug: [path] },
      })),
    ],
    fallback: false,
  };
}
