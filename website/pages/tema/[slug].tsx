import { Heading } from "@navikt/ds-react";
import Head from "next/head";
import React from "react";
import {
  ArtikkelCard,
  getTemaSlug,
  PreviewBanner,
  TemaBreadcrumbs,
} from "../../components";
import Footer from "../../components/layout/footer/Footer";
import AkselHeader from "../../components/layout/header/AkselHeader";
import { SanityBlockContent } from "../../components/SanityBlockContent";
import {
  AkselArtikkel,
  AkselTema,
  akselTemaDocs,
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
      <TemaBreadcrumbs />
      <Heading level="1" size="xlarge" spacing className="index-lvl1">
        {page.title}
      </Heading>
      <SanityBlockContent blocks={page.beskrivelse} noLastMargin />

      <div className="aksel-card-grid-col-2 pt-20">
        {page.artikler.map((x) => {
          const author = x?.contributors?.[0]?.title;
          return (
            <ArtikkelCard
              {...x}
              author={author}
              source={page.title}
              key={x._id}
            />
          );
        })}
      </div>
    </>
  );
};

Page.getLayout = (page) => {
  return (
    <div className="bg-gray-50">
      <AkselHeader className="bg-gray-50" />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className="aksel-main--start w-full max-w-5xl py-16 md:py-20"
      >
        {page}
      </main>
      <Footer />
    </div>
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
  const temas = await getClient(preview).fetch(akselTemaDocs);

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
