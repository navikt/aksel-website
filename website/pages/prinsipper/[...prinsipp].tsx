import { LayoutPicker } from "@/components";
import {
  akselPrinsippBySlug,
  getAkselDocuments,
  SanityT,
  usePreviewSubscription,
} from "@/lib";
import { getClient } from "@/sanity-client";
import React from "react";
import NotFotfund from "../404";

interface PageProps {
  page: SanityT.Schema.aksel_prinsipp;
  prinsipp: string[];
  preview: boolean;
}

const Page = (props: PageProps): JSX.Element => {
  const { data } = usePreviewSubscription(akselPrinsippBySlug, {
    params: { slug: `prinsipper/${props.prinsipp.join("/")}` },
    initialData: props.page,
    enabled: props?.preview,
  });

  if (!data) {
    return <NotFotfund />;
  }

  return <LayoutPicker title="Aksel" data={data} />;
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

  const page = await getClient(false).fetch(akselPrinsippBySlug, {
    slug: `prinsipper/${prinsipp.join("/")}`,
  });

  return {
    props: {
      page,
      prinsipp,
      preview,
    },
    notFound: !page && !preview,
    revalidate: 60,
  };
};

export default Page;
