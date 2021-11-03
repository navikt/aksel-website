import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useUpdateEffect } from "react-use";
import { LayoutPicker, PreviewBanner } from "../../components";
import {
  changelogQuery,
  dsDocumentBySlug,
  dsDocuments,
  dsIsDraft,
  dsNavigationQuery,
  getClient,
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
  const documents: any[] | null = await getClient(false).fetch(dsDocuments);
  const paths = [];
  const componentPageTabs = ["design", "utvikling", "tilgjengelighet"];

  documents?.forEach((page) => {
    if (!page.slug) {
      return null;
    }
    const slug = page.slug.split("/");

    const defaultPush = () =>
      paths.push({
        params: {
          slug,
        },
      });
    switch (page._type) {
      case "ds_component_page":
        componentPageTabs.forEach((tab) => {
          paths.push({
            params: {
              slug: [...slug, tab],
            },
          });
        });
        defaultPush();
        break;
      case "ds_tabbed_article_page": {
        if (!page.tabs) break;
        const tabbedArticleTabs = page.tabs.map(
          (tab) => tab.title?.toLowerCase().replace(/\s+/g, "-") || "undefined"
        );
        tabbedArticleTabs.forEach((tab) => {
          paths.push({
            params: {
              slug: [...slug, tab],
            },
          });
        });
        break;
      }
      default:
        defaultPush();
        break;
    }
  });

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
  };
  revalidate: number;
}

export const getStaticProps = async ({
  params: { slug },
}: {
  params: { slug: string[] };
}): Promise<StaticProps> => {
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

  return {
    props: {
      page,
      slug: joinedSlug,
      navigation,
      changelogs,
      isDraft: isDraft.length === 0,
    },
    revalidate: 30,
  };
};

export default PagePicker;
