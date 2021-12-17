import React from "react";
import styled from "styled-components";
import Sandbox from "../../components/sanity-modules/sandbox";
import { SandboxKeys, Sandboxes } from "../../sandbox";
import { DsCodeSandbox } from "../../lib/autogen-types";

const CodePreview = (key: string) => {
  if (!key || !(key in Sandboxes)) {
    return null;
  }

  const node = {
    _type: "ds_code_sandbox",
    title: key,
    _id: "",
    _createdAt: "",
    _rev: "",
    _updatedAt: "",
  };
  return <Sandbox node={node} />;
  /* ds_code_sandbox: ({ node }) => <Sandbox node={node} />, */
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
