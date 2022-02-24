import React from "react";
import { LayoutPicker, PreviewBanner } from "../../components";
import Footer from "../../components/layout/footer/Footer";
import AkselHeader from "../../components/layout/header/AkselHeader";
import {
  AkselArtikkel,
  akselDocumentBySlug,
  getAkselArtikler,
  getClient,
} from "../../lib";

const Page = (props: {
  slug?: string;
  page: AkselArtikkel;
  preview: boolean;
}): JSX.Element => {
  /* useEffect(() => {
    process.env.NODE_ENV === "production" && hotjar.initialize(148751, 6);
  }, []); */
  return (
    <>
      {props.preview && <PreviewBanner />}
      <LayoutPicker title="Aksel" data={props.page} />
    </>
  );
};

Page.getLayout = (page) => {
  return (
    <>
      <a className="skiplink" href="#hovedinnhold" tab-index={-1}>
        Hopp til innhold
      </a>
      <AkselHeader />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className="relative flex min-h-screen-header  w-full flex-col items-center bg-canvas-background-light focus:outline-none"
      >
        {page}
        <div className="mt-auto" aria-hidden />
      </main>
      <Footer />
    </>
  );
};

export const getStaticPaths = async (): Promise<{
  fallback: string;
  paths: { params: { slug: string } }[];
}> => {
  return {
    paths: await getAkselArtikler().then((paths) =>
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
    page: AkselArtikkel;
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
  params: { slug: string };
  preview?: boolean;
}): Promise<StaticProps | { notFound: true }> => {
  const client = getClient(preview);
  let page = await client.fetch(akselDocumentBySlug, {
    slug: `artikkel/${slug}`,
  });

  const isDraft = page.filter((item) => !item._id.startsWith("drafts.")).length;

  page = page?.find((item) => item._id.startsWith(`drafts.`)) || page?.[0];

  const validPath = await getAkselArtikler().then((paths) =>
    paths.map((x) => x.replace("artikkel/", "")).includes(slug)
  );

  return {
    props: {
      page: page ?? null,
      slug,
      isDraft: isDraft === 0,
      validPath,
      preview,
    },
    revalidate: 10,
  };
};

export default Page;
