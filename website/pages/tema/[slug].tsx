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
import NextLink from "next/link";

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
        className="index-lvl1 self-start pt-8"
      >
        {page.title}
      </Heading>
      <SanityBlockContent blocks={page.beskrivelse} className="mb-32" />
      <div className="grid justify-center gap-8 [grid-template-columns:repeat(auto-fit,_20rem)] lg:justify-start">
        {page.artikler.map((x) => (
          <div
            key={x._id}
            className="min-h-32 group relative min-w-[16rem] flex-1 cursor-pointer rounded border-2 border-transparent bg-white px-6 py-8 shadow-card focus-within:shadow-focus hover:border-link"
          >
            <NextLink href={`/${x.slug}`} passHref>
              <Heading
                as="a"
                size="small"
                className="after:absolute after:inset-0 focus:underline focus:outline-none group-hover:text-link "
              >
                {x.heading}
              </Heading>
            </NextLink>
            <div className="mt-3">
              Lorem nisi veniam est elit ut excepteur elit nostrud sit.
            </div>
          </div>
        ))}
      </div>
      <Feedback center docId={page?._id} docType={page?._type} />
    </>
  );
};

Page.getLayout = (page) => {
  return (
    <>
      <AkselHeader className="bg-gray-50" />
      <main tabIndex={-1} id="hovedinnhold" className="aksel-main bg-gray-50">
        <div className="aksel-main--start max-w-6xl">{page}</div>
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
  artikler: Partial<AkselArtikkel & { slug: string; tema: string[] }>[];
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
