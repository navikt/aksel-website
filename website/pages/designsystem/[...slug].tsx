import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { LayoutPicker, PreviewBanner } from "../../components";
import {
  changelogQuery,
  dsDocumentBySlug,
  dsDocuments,
  dsIsDraft,
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

const PagePicker = (props: {
  slug?: string;
  page: DsComponentPage | DsTabbedArticlePage | DsArticlePage;
  navigation: DsNavigation;
  changelogs?: DsChangelog[];
}): JSX.Element => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      <LayoutPicker data={data} changelogs={changelogs} />
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

  const isDraft = await client.fetch(dsIsDraft, {
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
    revalidate: 30,
  };
};

export default PagePicker;
