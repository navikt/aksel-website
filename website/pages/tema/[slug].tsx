import React from "react";
import { LayoutPicker, PreviewBanner } from "../../components";
import Footer from "../../components/layout/footer/Footer";
import AkselHeader from "../../components/layout/header/AkselHeader";
import {
  AkselArtikkel,
  akselDocByTag,
  akselDocumentBySlug,
  getAkselArtikler,
  getAkselTema,
} from "../../lib";
import { getClient } from "../../lib/sanity/sanity.server";

const Page = (props: {
  slug?: string;
  page: AkselArtikkel;
  preview: boolean;
}): JSX.Element => {
  console.log(props.page);
  return (
    <>
      {props.preview && <PreviewBanner />}
      {/* <LayoutPicker title="Aksel" data={props.page} /> */}
    </>
  );
};

Page.getLayout = (page) => {
  return (
    <>
      <AkselHeader />
      <main tabIndex={-1} id="hovedinnhold" className="aksel-main">
        {page}
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
    paths: await getAkselTema().then((paths) =>
      paths.map((slug) => ({
        params: {
          slug,
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
  const page = await getClient(preview).fetch(akselDocByTag, {
    tag: slug,
  });

  const doc = page?.[0] ?? null;

  return {
    props: {
      page: doc,
      slug,
      preview,
    },
    notFound: !doc,
    revalidate: 10,
  };
};

export default Page;
