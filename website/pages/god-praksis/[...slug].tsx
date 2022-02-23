import React, { useEffect } from "react";
import { hotjar } from "react-hotjar";
import { LayoutPicker, PreviewBanner } from "../../components";
import GodPraksisHeader from "../../components/layout/header/GodPraksisHeader";
import {
  getClient,
  getGpPaths,
  GpArticlePage,
  gpDocumentBySlug,
} from "../../lib";

const Page = (props: {
  slug?: string;
  page: GpArticlePage;
  sidebar: any;
  preview: boolean;
}): JSX.Element => {
  useEffect(() => {
    process.env.NODE_ENV === "production" && hotjar.initialize(148751, 6);
  }, []);

  return (
    <>
      {props.preview && <PreviewBanner />}
      <LayoutPicker title="God Praksis" data={props.page} />
    </>
  );
};

Page.getLayout = (page) => {
  return (
    <>
      <a className="skiplink" href="#hovedinnhold" tab-index={-1}>
        Hopp til innhold
      </a>
      <GodPraksisHeader />
      <div className="flex bg-canvas-background-light">
        <div className="relative w-full">
          <main
            tabIndex={-1}
            id="hovedinnhold"
            className="relative min-h-header w-full focus:outline-none lg:max-w-[calc(100vw_-_var(--sidebar-max-width))]"
          >
            {page}
            <div className="mt-auto" aria-hidden />
          </main>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths = async (): Promise<{
  fallback: string;
  paths: { params: { slug: string[] } }[];
}> => {
  return {
    paths: await getGpPaths().then((paths) =>
      paths.map((slug) => ({
        params: {
          slug: slug.filter((x) => x !== "god-praksis"),
        },
      }))
    ),
    fallback: "blocking",
  };
};

interface StaticProps {
  props: {
    page: GpArticlePage;
    slug: string;
    isDraft: boolean;
    validPath: boolean;
    preview: boolean;
  };
  revalidate: number;
}

export const getStaticProps = async ({
  params: { slug },
  preview = false,
}: {
  params: { slug: string[] };
  preview?: boolean;
}): Promise<StaticProps | { notFound: true }> => {
  const joinedSlug = slug.slice(0, 2).join("/");

  const client = getClient(preview);

  let page = await client.fetch(gpDocumentBySlug, {
    slug: "god-praksis/" + joinedSlug,
  });

  const isDraft = page?.filter(
    (item) => !item._id.startsWith("drafts.")
  ).length;

  page = page?.find((item) => item._id.startsWith(`drafts.`)) || page?.[0];

  return {
    props: {
      page: page ?? null,
      slug: joinedSlug,
      isDraft: isDraft === 0,
      validPath: !!page,
      preview,
    },
    revalidate: 10,
  };
};

export default Page;
