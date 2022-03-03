import { Right } from "@navikt/ds-icons";
import { Heading } from "@navikt/ds-react";
import Head from "next/head";
import NextLink from "next/link";
import React from "react";
import { PreviewBanner } from "../../components";
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
        className="index-lvl1 self-start pt-16"
      >
        {page.title}
      </Heading>
      <SanityBlockContent blocks={page.beskrivelse} className="mb-32" />

      <div className="grid grid-cols-1 justify-center gap-4 pb-16 sm:grid-cols-2 sm:gap-8 lg:justify-start xl:grid-cols-3">
        {page.artikler.map((x) => (
          <div
            key={x._id}
            className="group relative min-h-[12rem] min-w-[16rem] flex-1 cursor-pointer rounded border-2 border-transparent bg-white px-6 py-8 shadow-small focus-within:shadow-focus hover:border-link"
          >
            <NextLink
              href={{
                pathname: `/${x.slug}`,
                query: {
                  tema: page.tag.toLowerCase().trim().replace(" ", "-"),
                },
              }}
              passHref
            >
              <Heading
                as="a"
                size="small"
                className="index-lvl2 after:absolute after:inset-0 focus:underline focus:outline-none group-hover:text-link "
              >
                {x.heading}
              </Heading>
            </NextLink>
            <div className="mt-3">
              Lorem nisi veniam est elit ut excepteur elit nostrud sit.
            </div>
            <Right className=" absolute right-4 bottom-4 -rotate-45" />
          </div>
        ))}
      </div>
    </>
  );
};

Page.getLayout = (page) => {
  return (
    <>
      <AkselHeader className="bg-gray-50" />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className="aksel-main bg-gray-50 py-16 md:py-12"
      >
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
