import { ArtikkelCard, PreviewBanner } from "@/components";
import { AkselHeader, Footer } from "@/layout";
import {
  AkselArtikkel,
  akselTemaDocs,
  getAkselTema,
  getTemaSlug,
  SanityT,
} from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { Heading, Link } from "@navikt/ds-react";
import Head from "next/head";
import NextLink from "next/link";
import React from "react";
import { getClient } from "../../lib/sanity/sanity.server";

type ArtiklerT = Partial<
  AkselArtikkel & {
    slug: string;
    tema: string[];
    contributors?: { title?: string }[];
  }
>;

export interface AkselTemaPage extends SanityT.Schema.aksel_tema {
  artikler: ArtiklerT[];
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
        <main
          tabIndex={-1}
          id="hovedinnhold"
          className="min-h-[80vh] bg-gray-100 focus:outline-none"
        >
          <div className="relative bg-white px-4 pt-12 pb-8 md:pb-10">
            <div className="mx-auto max-w-aksel xs:w-[90%]">
              <NextLink href="/tema" passHref>
                <Link className="font-semibold uppercase tracking-widest text-text md:text-base">
                  Tema
                </Link>
              </NextLink>
              <Heading level="1" size="xlarge" className="algolia-index-lvl1">
                {page.title}
              </Heading>
              <div className="mt-3 max-w-prose">
                <SanityBlockContent blocks={page.beskrivelse} noLastMargin />
              </div>
            </div>
          </div>

          {!page?.bruk_seksjoner || page?.seksjoner?.length === 0 ? (
            <div className="relative bg-gray-100 px-4 pt-8 pb-24 md:pt-12">
              <div className="mx-auto max-w-aksel xs:w-[90%]">
                <div className="grid gap-3 sm:grid-cols-2 md:gap-6">
                  {page.artikler.map((x) => (
                    <ArtikkelCard {...x} source={page.title} key={x._id} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="relative bg-gray-100 px-4 pt-8 pb-24 md:pt-12">
                <div className="mx-auto grid max-w-aksel gap-16 xs:w-[90%]">
                  {page.seksjoner.map((seksjon) => (
                    <div key={seksjon._key}>
                      <Heading level="2" size="medium">
                        {seksjon.title}
                      </Heading>
                      {seksjon.beskrivelse && (
                        <div className="mt-3 mb-6 max-w-prose">
                          <SanityBlockContent
                            blocks={seksjon.beskrivelse}
                            noLastMargin
                          />
                        </div>
                      )}
                      <div className="grid gap-3 sm:grid-cols-2 md:gap-6">
                        {(seksjon.sider as unknown as ArtiklerT[]).map(
                          (x: ArtiklerT) => (
                            <ArtikkelCard
                              {...x}
                              source={x.heading}
                              key={x._id}
                            />
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </main>
        <Footer variant="aksel" />
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
  const temas = await getClient(preview).fetch(akselTemaDocs);

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
