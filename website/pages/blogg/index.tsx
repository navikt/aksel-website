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
        <main
          tabIndex={-1}
          id="hovedinnhold"
          className="min-h-[80vh] bg-gray-100 focus:outline-none"
        >
          <div className="relative bg-white px-4 pt-8 pb-8 md:pt-12">
            <div className="mx-auto w-fit max-w-2xl xs:w-[90%]">
              <Heading
                level="1"
                size="xlarge"
                spacing
                className="algolia-index-lvl1"
              >
                Blogg
              </Heading>
            </div>
          </div>
          <div className="relative px-4 pt-8 pb-24">
            <div className="mx-auto w-fit max-w-2xl xs:w-[90%]">
              <div className="mt-4 grid gap-2 divide-y divide-gray-300">
                {page.map((blog) => (
                  <BloggCard key={blog._id} blog={blog} />
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer variant="aksel" />
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
