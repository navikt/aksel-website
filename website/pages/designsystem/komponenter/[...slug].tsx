import React from "react";
import { LayoutPicker, PreviewBanner } from "../../../components";
import Footer from "../../../components/layout/footer/Footer";
import DesignsystemHeader from "../../../components/layout/header/DesignsystemHeader";
import DesignsystemSidebar from "../../../components/layout/sidebar/DesignsystemSidebar";
import {
  dsDocumentBySlug,
  DsNavigation,
  dsNavigationQuery,
  getClient,
  getDsPaths,
  KomponentArtikkel,
} from "../../../lib";

const Page = (props: {
  slug?: string;
  page: KomponentArtikkel;
  navigation: DsNavigation;
  preview: boolean;
}): JSX.Element => {
  return (
    <>
      {props.preview && <PreviewBanner />}
      <LayoutPicker title="Designsystemet" data={props.page} />
    </>
  );
};

Page.getLayout = (page) => {
  return (
    <>
      <a className="skiplink" href="#hovedinnhold" tab-index={-1}>
        Hopp til innhold
      </a>
      <DesignsystemHeader />
      <div className="flex bg-canvas-background-light">
        <DesignsystemSidebar />
        <div className="relative w-full">
          <main
            tabIndex={-1}
            id="hovedinnhold"
            className="relative min-h-header w-full focus:outline-none lg:max-w-[calc(100vw_-_var(--sidebar-max-width))]"
          >
            {page}
            <div className="mt-auto" aria-hidden />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export const getStaticPaths = async (): Promise<{
  fallback: string;
  paths: { params: { slug: string[] } }[];
}> => {
  return {
    paths: await getDsPaths().then((paths) =>
      paths
        .filter((x) => x.join("/").startsWith("designsystem/komponenter/"))
        .map((slug) => ({
          params: {
            slug: slug.filter(
              (x) => x !== "designsystem" && x !== "komponenter"
            ),
          },
        }))
    ),
    fallback: "blocking",
  };
};

interface StaticProps {
  props: {
    page: KomponentArtikkel;
    slug: string;
    navigation: DsNavigation;
    isDraft: boolean;
    validPath: boolean;
    preview: boolean;
  };
  revalidate: number;
}

export const getStaticProps = async ({
  params: { slug },
  preview = false,
}: {
  params: { slug: string[] };
  preview?: boolean;
}): Promise<StaticProps | { notFound: true }> => {
  const joinedSlug = slug.join("/");

  const client = getClient(preview);
  let page = await client.fetch(dsDocumentBySlug, {
    slug: "designsystem/komponenter/" + slug[0],
  });

  const isDraft = page.filter((item) => !item._id.startsWith("drafts.")).length;

  page = page?.find((item) => item._id.startsWith(`drafts.`)) || page?.[0];

  const navigation = await client.fetch(dsNavigationQuery);

  const validPath = await getDsPaths().then((paths) =>
    paths
      .map((slugs) =>
        slugs
          .filter((slug) => slug !== "designsystem" && slug !== "komponenter")
          .join("/")
      )
      .includes(joinedSlug)
  );

  return {
    props: {
      page: page ?? null,
      slug: joinedSlug,
      navigation,
      isDraft: isDraft === 0,
      validPath,
      preview,
    },
    revalidate: 10,
  };
};

export default Page;
