import { useClientLayoutEffect } from "@navikt/ds-react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { LayoutPicker, PreviewBanner } from "../../components";
import {
  changelogQuery,
  dsDocumentBySlug,
  dsDocuments,
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
  preview: boolean;
  slug?: string;
  page: DsComponentPage | DsTabbedArticlePage | DsArticlePage;
  navigation: DsNavigation;
  changelogs?: DsChangelog[];
}): JSX.Element => {
  const router = useRouter();
  const enablePreview = !!props.preview || !!router.query.preview;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setPageData] = useContext(PagePropsContext);

  const { data } = usePreviewSubscription(dsDocumentBySlug, {
    params: { slug: "designsystem/" + props.slug },
    initialData: props.page,
    enabled: enablePreview,
  });

  const { data: changelogs } = usePreviewSubscription(changelogQuery, {
    initialData: props.changelogs,
    enabled: enablePreview,
  });

  const { data: nav } = usePreviewSubscription(dsNavigationQuery, {
    initialData: props.navigation,
    enabled: enablePreview,
  });

  useClientLayoutEffect(() => {
    setPageData({ ...props, navigation: nav });
  }, [nav]);

  useClientLayoutEffect(() => {
    setPageData({ ...props, page: data });
  }, [data]);

  return (
    <>
      {enablePreview && <PreviewBanner />}
      <LayoutPicker data={data} changelogs={changelogs} />
    </>
  );
};

export const getStaticPaths = async (): Promise<{
  fallback: boolean;
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
    fallback: true,
  };
};

interface StaticProps {
  props: {
    page: DsComponentPage | DsTabbedArticlePage | DsArticlePage;
    preview: boolean;
    slug: string;
    changelogs: DsChangelog[] | null;
    navigation: DsNavigation;
  };
  revalidate: number;
}

export const getStaticProps = async ({
  params: { slug },
  preview,
}: {
  params: { slug: string[] };
  preview: boolean;
}): Promise<StaticProps> => {
  /* Hack: Build slug: ["designsystem", "side", "button"], dev slug: ["side", "button"] */
  const joinedSlug = slug
    .filter((x) => x !== "designsystem")
    .slice(0, 2)
    .join("/");

  const enablePreview = !!preview;
  const client = getClient(enablePreview);
  const page = await client.fetch(dsDocumentBySlug, {
    slug: "designsystem/" + joinedSlug,
  });

  const changelogs =
    page?._type === "ds_component_page"
      ? await client.fetch(changelogQuery)
      : null;

  const navigation = await client.fetch(dsNavigationQuery);

  return {
    props: {
      page,
      preview: enablePreview,
      slug: joinedSlug,
      navigation,
      changelogs,
    },
    revalidate: 60,
  };
};

export default PagePicker;
