import { PreviewBanner } from "@/components";
import {
  akselEditorById,
  akselPrinsippBySlug,
  getAkselTema,
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
  console.log(page);
  return (
    <>
      {preview && <PreviewBanner />}

      {/* <LayoutPicker title="Aksel" data={page} /> */}
    </>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [
      { prinsipp: "brukeropplevelse", side: "test" },
      { prinsipp: "brukeropplevelse2", side: "3" },
    ].map((slug) => ({
      params: {
        prinsipp: [slug.prinsipp, slug.side],
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps = async ({
  params: { prinsipp, side },
  preview = false,
}: {
  params: { prinsipp: string; side: string };
  preview?: boolean;
}) => {
  console.log({ prinsipp, side });
  const page = await getClient(preview).fetch(akselPrinsippBySlug, {
    slug: `prinsipp/${prinsipp}/${side}`,
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
