import React from "react";
import { LayoutPicker, PreviewBanner } from "../../components";
import {
  AkselBlogg,
  akselBloggBySlug,
  akselEditorById,
  getAkselDocuments,
} from "../../lib";
import { getClient } from "../../lib/sanity/sanity.server";

const Page = (props: {
  slug?: string;
  page: AkselBlogg;
  preview: boolean;
}): JSX.Element => {
  return (
    <>
      {props.preview && <PreviewBanner />}
      <LayoutPicker title="Aksel" data={props.page} />
    </>
  );
};

export const getStaticPaths = async (): Promise<{
  fallback: string;
  paths: { params: { slug: string } }[];
}> => {
  return {
    paths: await getAkselDocuments("aksel_blogg").then((paths) =>
      paths.map((slug) => ({
        params: {
          slug: slug.replace("artikkel/", ""),
        },
      }))
    ),
    fallback: "blocking",
  };
};

interface StaticProps {
  props: {
    page: AkselBlogg;
    slug: string;
    preview: boolean;
  };
  notFound: boolean;
  revalidate: number;
}

export const getStaticProps = async ({
  params: { slug },
  preview = false,
}: {
  params: { slug: string };
  preview?: boolean;
}): Promise<StaticProps | { notFound: true }> => {
  const page = await getClient(preview).fetch(akselBloggBySlug, {
    slug: `blogg/${slug}`,
  });

  const doc = page?.[0] ?? null;

  const editors = doc
    ? await getClient(true).fetch(akselEditorById, {
        id: doc._id,
      })
    : [];

  return {
    props: {
      page: { ...doc, ...editors },
      slug,
      preview,
    },
    notFound: !doc,
    revalidate: 10,
  };
};

export default Page;
