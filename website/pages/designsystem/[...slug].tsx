import { useRouter } from "next/router";
import {
  usePreviewSubscription,
  getClient,
  changelogQuery,
  ChangelogT,
  dsDocuments,
  dsDocumentBySlug,
} from "../../lib";
import { isDevelopment } from "../../components";
import PreviewBanner from "../../components/PreviewBanner";
import TemplatePicker from "../../components/templates/TemplatePicker";
import { useContext, useEffect } from "react";
import { PagePropsContext } from "../_app";

const PagePicker = (props: {
  preview: boolean;
  slug?: string;
  page: any;
  sidebar: any;
  changelogs?: ChangelogT[];
}): JSX.Element => {
  console.log("called slug");
  const router = useRouter();
  const enablePreview = !!props.preview || !!router.query.preview;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setPageData] = useContext(PagePropsContext);

  const { data } = usePreviewSubscription(dsDocumentBySlug, {
    params: { slug: props?.slug },
    initialData: props.page,
    enabled: enablePreview,
  });

  const { data: changelogs } = usePreviewSubscription(changelogQuery, {
    initialData: props.changelogs,
    enabled: enablePreview,
  });

  /* useEffect(() => {
    setPageData({ ...props, sidebar });
  }, [sidebar]); */

  useEffect(() => {
    setPageData({ ...props, page: data });
  }, [data]);

  return (
    <>
      {enablePreview && <PreviewBanner />}
      <TemplatePicker
        data={data}
        /* sidebar={sidebar} */ changelogs={changelogs}
      />
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
    page;
    preview: boolean;
    slug: string;
    changelogs: ChangelogT[] | null;
    /* sidebar; */
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
  const joinedSlug = slug.slice(0, 2).join("/");

  const enablePreview = !!preview || isDevelopment();
  const page = await getClient(enablePreview).fetch(dsDocumentBySlug, {
    slug: "designsystem/" + joinedSlug,
  });

  const changelogs =
    page._type === "ds_component_page"
      ? await getClient(enablePreview).fetch(changelogQuery)
      : null;

  /* const sidebar = await getClient(true).fetch(sidebarQuery("navigation_designsystem")); */
  return {
    props: {
      page,
      preview: enablePreview,
      slug: joinedSlug,
      /* sidebar: sidebar, */
      changelogs,
    },
    revalidate: 60,
  };
};

export default PagePicker;
