import { Heading } from "@navikt/ds-react";
import Head from "next/head";
import React from "react";
import { Feedback, PreviewBanner } from "../../components";
import Footer from "../../components/layout/footer/Footer";
import AkselHeader from "../../components/layout/header/AkselHeader";
import { SanityBlockContent } from "../../components/SanityBlockContent";
import { akselDocByTag, AkselTema, getAkselTema } from "../../lib";
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
      <div className="m-0 w-full max-w-content-w-padding px-4 pb-4 md:mx-auto md:my-0 md:px-6 lg:mx-0 lg:px-12 lg:pb-4">
        <div className="relative flex flex-col justify-center">
          <div className="flex max-w-text flex-col items-center pt-8 pb-6">
            <Heading level="1" size="xlarge" spacing className="index-lvl1">
              {page.title}
            </Heading>
          </div>
          <SanityBlockContent
            className="mx-auto mt-12 flex min-h-[500px] w-full flex-col"
            blocks={page.beskrivelse}
          />

          <Feedback center docId={page?._id} docType={page?._type} />
        </div>
      </div>
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

interface PageProps {
  page: AkselTema;
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
