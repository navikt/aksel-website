import { BodyLong, Heading } from "@navikt/ds-react";
import Head from "next/head";
import React from "react";
import { ArtikkelCard, PreviewBanner, TemaBreadcrumbs } from "../../components";
import Footer from "../../components/layout/footer/Footer";
import AkselHeader from "../../components/layout/header/AkselHeader";
import { AkselBlogg, akselBloggPosts } from "../../lib";
import { getClient } from "../../lib/sanity/sanity.server";

const Page = ({ preview, page }: PageProps): JSX.Element => {
  return (
    <>
      {preview && <PreviewBanner />}
      <Head>
        <title>{`Blogg - Aksel`}</title>
        <meta property="og:title" content={`Blogg - Aksel`} />
      </Head>
      <TemaBreadcrumbs />
      <Heading level="1" size="xlarge" spacing className="algolia-index-lvl1">
        Blogg
      </Heading>
      {/* <SanityBlockContent blocks={page.beskrivelse} noLastMargin /> */}
      <Heading level="2" size="large" className="pt-20" spacing>
        Siste bloggposts
      </Heading>
      <div className="aksel-card-grid-col-2 ">
        {page.map((x) => {
          const authors = x?.contributors;
          return (
            <ArtikkelCard
              {...x}
              authors={authors}
              source={"blogg"}
              key={x._id}
            />
          );
        })}
      </div>
      {page.length === 0 && (
        <BodyLong>Fant ingen publiserte bloggposts...</BodyLong>
      )}
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

export type AkselBloggPage = Partial<
  AkselBlogg & { slug: string; contributors?: { title?: string }[] }
>;

interface PageProps {
  page: AkselBloggPage[];
  preview: boolean;
}

interface StaticProps {
  props: PageProps;
  notFound: boolean;
  revalidate: number;
}

export const getStaticProps = async ({
  preview = false,
}: {
  preview?: boolean;
}): Promise<StaticProps | { notFound: true }> => {
  const temas = await getClient(preview).fetch(akselBloggPosts);

  return {
    props: {
      page: temas,
      preview,
    },
    notFound: !temas,
    revalidate: 60,
  };
};

export default Page;
