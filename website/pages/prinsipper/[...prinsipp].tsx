import { LayoutPicker, PreviewBanner } from "@/components";
import {
  akselEditorById,
  akselPrinsippBySlug,
  getAkselDocuments,
  SanityT,
} from "@/lib";
import React from "react";
import { getClient } from "../../lib/sanity/sanity.server";

interface PageProps {
  page: SanityT.Schema.aksel_prinsipp;
  slug: string;
  preview: boolean;
}

const Page = ({ preview, page }: PageProps): JSX.Element => {
  return (
    <>
      {preview && <PreviewBanner />}
      <LayoutPicker title="Aksel" data={page} />
    </>
  );
};

export const getStaticPaths = async (): Promise<{
  fallback: string;
  paths: { params: { prinsipp: string[] } }[];
}> => {
  return {
    paths: await getAkselDocuments("aksel_prinsipp").then((paths) =>
      paths.map((slug) => ({
        params: {
          prinsipp: slug.replace("prinsipper/", "").split("/"),
        },
      }))
    ),
    fallback: "blocking",
  };
};

export const getStaticProps = async ({
  params: { prinsipp },
  preview = false,
}: {
  params: { prinsipp: string[] };
  preview?: boolean;
}) => {
  if (prinsipp.length > 2) return { notFound: true };

  const page = await getClient(preview).fetch(akselPrinsippBySlug, {
    slug: `prinsipper/${prinsipp.join("/")}`,
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
      preview,
    },
    notFound: !doc,
    revalidate: 10,
  };
};

export default Page;
