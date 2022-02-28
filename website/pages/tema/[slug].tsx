import { Heading } from "@navikt/ds-react";
import Head from "next/head";
import React from "react";
import { Feedback, PreviewBanner } from "../../components";
import Footer from "../../components/layout/footer/Footer";
import AkselHeader from "../../components/layout/header/AkselHeader";
import { SanityBlockContent } from "../../components/SanityBlockContent";
import {
  AkselArtikkel,
  akselDocByTag,
  AkselTema,
  getAkselTema,
} from "../../lib";
import { getClient } from "../../lib/sanity/sanity.server";

const Page = ({ preview, page }: PageProps): JSX.Element => {
  console.log(page);
  return (
    <>
      {preview && <PreviewBanner />}
      <Head>
        <title>{`${page.title} - Aksel`}</title>
        <meta property="og:title" content={`${page.title} - Aksel`} />
      </Head>

      <Heading
        level="1"
        size="xlarge"
        spacing
        className="index-lvl1 flex w-full max-w-text justify-center self-start pt-8 pb-6"
      >
        {page.title}
      </Heading>
      <SanityBlockContent
        className="mx-auto mt-12 w-full"
        blocks={page.beskrivelse}
      />

      {page.artikler.map((x) => (
        <div key={x._id}>{x.slug}</div>
      ))}
      {/* <Feedback center docId={page?._id} docType={page?._type} /> */}
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

interface AkselTemaPage extends AkselTema {
  artikler: Partial<AkselArtikkel>[];
}

interface PageProps {
  page: AkselTemaPage;
  slug: string;
  preview: boolean;
}

interface StaticProps {
  props: PageProps;
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
