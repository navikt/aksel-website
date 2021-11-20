import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Feedback, LayoutPicker, PreviewBanner } from "../../components";
import DesignsystemFooter from "../../components/layout/footer/DesignsystemFooter";
import DesignsystemHeader from "../../components/layout/header/DesignsystemHeader";
import DesignsystemSidebar from "../../components/layout/sidebar/DesignsystemSidebar";
import {
  changelogQuery,
  dsDocumentBySlug,
  isDraftQuery,
  dsNavigationQuery,
  getClient,
  getDsPaths,
  usePreviewSubscription,
} from "../../lib";
import {
  DsArticlePage,
  DsChangelog,
  DsComponentPage,
  DsNavigation,
  DsTabbedArticlePage,
} from "../../lib/autogen-types";
import { PagePropsContext } from "../_app";
import * as Sc from "../../components";

const Page = (props: {
  slug?: string;
  page: DsComponentPage | DsTabbedArticlePage | DsArticlePage;
  navigation: DsNavigation;
  changelogs?: DsChangelog[];
}): JSX.Element => {
  const router = useRouter();

  const { pageProps, setPageData } = useContext(PagePropsContext);

  const [isPreview, setIsPreview] = useState(false);

  const { data } = usePreviewSubscription(dsDocumentBySlug, {
    params: { slug: "designsystem/" + props.slug },
    initialData: props.page,
    enabled: isPreview,
  });

  const { data: changelogs } = usePreviewSubscription(changelogQuery, {
    initialData: props.changelogs,
    enabled: isPreview,
  });

  const { data: nav } = usePreviewSubscription(dsNavigationQuery, {
    initialData: props.navigation,
    enabled: isPreview,
  });

  useEffect(() => {
    nav && setPageData({ ...props, ...pageProps, navigation: nav });
  }, [nav]);

  useEffect(() => {
    data &&
      setPageData({
        ...props,
        ...pageProps,
        page: data,
      });
  }, [data]);

  useEffect(() => {
    setIsPreview(!!router.query.preview);
  }, [router.query]);

  return (
    <>
      {isPreview && <PreviewBanner />}
      <>
        <LayoutPicker
          title="Designsystemet"
          data={data}
          changelogs={changelogs}
        />
        <Sc.Grow />
        <Feedback
          docId={pageProps?.page?._id}
          docType={pageProps?.page?._type}
        />
        {/* {LayoutParts[pageType]?.title === "Designsystemet" && (
              <RelatedPagesLink />
            )} */}
      </>
    </>
  );
};

Page.getLayout = (page) => {
  return (
    <>
      <Sc.SkipLink href="#hovedinnhold" tab-index={-1}>
        Hopp til innhold
      </Sc.SkipLink>
      <DesignsystemHeader />
      <Sc.SidebarMain>
        <DesignsystemSidebar />
        <Sc.MainFooter>
          <Sc.Main tabIndex={-1} id="hovedinnhold">
            {page}
          </Sc.Main>
          <DesignsystemFooter />
        </Sc.MainFooter>
      </Sc.SidebarMain>
    </>
  );
};

export const getStaticPaths = async (): Promise<{
  fallback: string;
  paths: { params: { slug: string[] } }[];
}> => {
  const paths = await getDsPaths().then((paths) =>
    paths.map((slug) => ({
      params: {
        slug,
      },
    }))
  );

  return {
    paths,
    fallback: "blocking",
  };
};

interface StaticProps {
  props: {
    page: DsComponentPage | DsTabbedArticlePage | DsArticlePage;
    slug: string;
    changelogs: DsChangelog[] | null;
    navigation: DsNavigation;
    isDraft: boolean;
    validPath: boolean;
  };
  revalidate: number;
}

export const getStaticProps = async ({
  params: { slug },
}: {
  params: { slug: string[] };
}): Promise<StaticProps | { notFound: true }> => {
  /* Hack: Build slug: ["designsystem", "side", "button"], dev slug: ["side", "button"] */
  const joinedSlug = slug
    .filter((x) => x !== "designsystem")
    .slice(0, 2)
    .join("/");

  const client = getClient(false);
  const page = await client.fetch(dsDocumentBySlug, {
    slug: "designsystem/" + joinedSlug,
  });

  const changelogs =
    page?._type === "ds_component_page"
      ? await client.fetch(changelogQuery)
      : null;

  const navigation = await client.fetch(dsNavigationQuery);

  const isDraft = await client.fetch(isDraftQuery, {
    slug: "designsystem/" + joinedSlug,
  });

  const validPath = await getDsPaths().then((paths) =>
    paths
      .map((slugs) => slugs.filter((slug) => slug !== "designsystem").join("/"))
      .includes(slug.filter((x) => x !== "designsystem").join("/"))
  );

  return {
    props: {
      page,
      slug: joinedSlug,
      navigation,
      changelogs,
      isDraft: isDraft.length === 0,
      validPath,
    },
    revalidate: 10,
  };
};

export default Page;
