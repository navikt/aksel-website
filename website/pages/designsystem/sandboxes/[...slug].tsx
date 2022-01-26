import { Heading } from "@navikt/ds-react";
import Head from "next/head";
import React from "react";
import { Sandbox } from "../../../components";
import { SandboxKeys, Sandboxes } from "../../../stories/sandbox";

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

const Page = (props: any) => {
  return CodePreview(props.compkey);
};

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

export async function getStaticProps({ params: { slug } }) {
  const joinedSlug = slug.join("/");

  return {
    props: {
      compkey: slug,
      slug: joinedSlug,
      isDraft: false,
      validPath: true,
      preview: false,
    },
  };
}

export default Page;
