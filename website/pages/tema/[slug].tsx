import { ArtikkelCard, PreviewBanner } from "@/components";
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
import NextLink from "next/link";
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
        <AkselHeader variant="tema" />
        <main tabIndex={-1} id="hovedinnhold" className="focus:outline-none">
          <div className="relative bg-white px-4 pt-12 pb-8 md:pb-10">
            <div className="mx-auto max-w-aksel xs:w-[90%]">
              <NextLink href="/tema" passHref>
                <a className="font-semibold uppercase tracking-widest md:text-base">
                  Tema
                </a>
              </NextLink>
              <Heading level="1" size="xlarge" className="algolia-index-lvl1">
                {page.title}
              </Heading>
              <div className="mt-3 max-w-prose">
                <SanityBlockContent blocks={page.beskrivelse} noLastMargin />
              </div>
            </div>
          </div>

          <div className="relative bg-gray-100 px-4 pt-8 pb-24 md:pt-12">
            <div className="mx-auto max-w-aksel xs:w-[90%]">
              <div className="grid gap-3 sm:grid-cols-2 md:gap-6">
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
            </div>
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
    revalidate: 60,
  };
};

export default Page;
