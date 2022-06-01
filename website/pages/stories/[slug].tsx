import { Heading } from "@navikt/ds-react";
import Head from "next/head";
import React from "react";
import { Sandboxes, SandboxKeys } from "stories/sandbox";
import { ExampleKeys, Examples } from "../../stories/examples";
import { Sandbox } from "@/components";

const SandboxCodePreview = (key: string) => {
  if (!key || !(key in Sandboxes)) {
    return null;
  }

  return (
    <Sandbox
      node={{
        _type: "ds_code_sandbox",
        title: key,
        _id: "",
        _createdAt: "",
        _rev: "",
        _updatedAt: "",
      }}
    />
  );
};

const ExampleCodePreview = (key: string) => {
  if (!key || !(key in Examples)) {
    return null;
  }

  const Comp = Examples[key];
  return <Comp />;
};

const Page = ({
  compkey,
  type,
}: {
  compkey: string;
  type: "sandbox" | "example";
}) => {
  return (
    <>
      <Head>
        <title>{`${compkey}`}</title>
      </Head>
      <Heading level="1" size="medium" className="navds-sr-only">
        {compkey}
      </Heading>
      {type === "sandbox" ? (
        SandboxCodePreview(compkey)
      ) : (
        <div className="flex w-full flex-col justify-center p-4">
          <div className="inline-grid flex-wrap items-center gap-4">
            {ExampleCodePreview(compkey)}
          </div>
        </div>
      )}
    </>
  );
};

export default Page;

export async function getStaticProps({ params: { slug } }) {
  return {
    props: {
      compkey: slug,
      slug: slug,
      type: slug.endsWith("-sandbox") ? "sandbox" : "example",
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
      ...SandboxKeys.map((path) => ({
        params: { slug: path },
      })),
    ],
    fallback: false,
  };
}
