import { PreviewBanner, LayoutPicker, getActiveHeading } from "@/components";
import { DsHeader, DsSidebar, Footer } from "@/layout";
import {
  DsComponentPage,
  DsNavigation,
  dsSlugQuery,
  getDsPaths,
  validateDsPath,
} from "@/lib";
import { getClient } from "@/sanity-client";

const Page = (props: {
  slug?: string;
  page: DsComponentPage;
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

export default Page;

Page.getLayout = (page) => {
  return (
    <>
      <DsHeader />
      <div className="flex w-full flex-col items-center bg-canvas-background-light">
        <div className="flex w-full max-w-screen-2xl">
          <DsSidebar />
          <div className="relative w-full">
            <main
              tabIndex={-1}
              id="hovedinnhold"
              className="relative min-h-screen-header w-full focus:outline-none md:max-w-screen-sidebar"
            >
              {page}
              <div className="mt-auto" aria-hidden />
            </main>
          </div>
        </div>
        <Footer variant="ds" />
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
      paths.map((slug) => ({
        params: {
          slug: slug.filter((x) => x !== "designsystem"),
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
  params: { slug: string[] };
  preview?: boolean;
}) => {
  const { page, nav } = await getClient(preview).fetch(dsSlugQuery, {
    slug: `designsystem/${slug.slice(0, 2).join("/")}`,
  });
  const doc = page?.[0] ?? null;

  return {
    props: {
      page: doc,
      slug: slug.join("/"),
      navigation: nav,
      activeHeading: getActiveHeading(nav, doc?.slug) ?? null,
      preview,
    },
    notFound: !(doc && validateDsPath(doc, slug)),
    revalidate: 60,
  };
};
