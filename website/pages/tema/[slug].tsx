import { ArtikkelCard, PreviewBanner, TemaBreadcrumbs } from "@/components";
import { AkselHeader, Footer } from "@/layout";
import {
  AkselArtikkel,
  AkselTema,
  akselTemaDocs,
  getAkselTema,
  getTemaSlug,
} from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { Heading } from "@navikt/ds-react";
import Head from "next/head";
import React from "react";
import { getClient } from "../../lib/sanity/sanity.server";

export interface AkselTemaPage extends AkselTema {
  artikler: Partial<
    AkselArtikkel & {
      slug: string;
      tema: string[];
      contributors?: { title?: string }[];
    }
  >[];
}

interface PageProps {
  page: AkselTemaPage;
  slug: string;
  preview: boolean;
}

const Page = ({ preview, page }: PageProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>{`${page.title} - Aksel`}</title>
        <meta property="og:title" content={`${page.title} - Aksel`} />
      </Head>
      {preview && <PreviewBanner />}
      <div className="bg-gray-50">
        <AkselHeader className="bg-gray-50" />
        <main
          tabIndex={-1}
          id="hovedinnhold"
          className="aksel-main--start w-full max-w-5xl py-16 md:py-20"
        >
          <TemaBreadcrumbs />
          <Heading
            level="1"
            size="xlarge"
            spacing
            className="algolia-index-lvl1"
          >
            {page.title}
          </Heading>
          <SanityBlockContent blocks={page.beskrivelse} noLastMargin />
          <Heading level="2" size="large" className="pt-20" spacing>
            Artikler
          </Heading>
          <div className="aksel-card-grid-col-2 ">
            {page.artikler.map((x) => {
              const authors = x?.contributors;
              return (
                <ArtikkelCard
                  {...x}
                  authors={authors}
                  source={page.title}
                  key={x._id}
                />
              );
            })}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
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

export const getStaticProps = async ({
  params: { slug },
  preview = false,
}: {
  params: { slug: string };
  preview?: boolean;
}) => {
  const temas = await getClient(true).fetch(akselTemaDocs);

  const doc = temas.find((tema) => getTemaSlug(tema?.title) === slug);

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
