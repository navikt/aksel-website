import { BloggCard, PreviewBanner } from "@/components";
import { AkselHeader, Footer } from "@/layout";
import { AkselBlogg, akselBloggPosts } from "@/lib";
import { Heading } from "@navikt/ds-react";
import Head from "next/head";
import React from "react";
import { getClient } from "../../lib/sanity/sanity.server";

const Page = ({ preview, page }: PageProps): JSX.Element => {
  return (
    <>
      {preview && <PreviewBanner />}
      <Head>
        <title>{`Blogg - Aksel`}</title>
        <meta property="og:title" content={`Blogg - Aksel`} />
      </Head>
      <div className="bg-gray-50">
        <AkselHeader variant="tema" />
        <main tabIndex={-1} id="hovedinnhold" className="focus:outline-none">
          <div className="relative min-h-screen-header bg-gray-100 px-4 pt-8 pb-24 md:pt-12">
            <div className="mx-auto w-fit max-w-aksel xs:w-[90%]">
              <Heading
                level="1"
                size="xlarge"
                spacing
                className="algolia-index-lvl1"
              >
                Alle blogger
              </Heading>

              <div className="mt-4 grid gap-2">
                {page.map((blog) => (
                  <BloggCard key={blog._id} blog={blog} />
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
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
