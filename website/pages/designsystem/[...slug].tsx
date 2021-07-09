import { useRouter } from "next/router";
import Error from "next/error";
import { getClient } from "../../lib/sanity.server";
import { usePreviewSubscription } from "../../lib/santiy";
import { isDevelopment } from "../../src/util";
import PreviewBanner from "../../components/PreviewBanner";
import styled from "styled-components";
import TemplatePicker from "../../components/templating/TemplatePicker";
import slugger from "../../components/slugger";

const PagePicker = (props) => {
  const router = useRouter();
  const enablePreview = !!props.preview || !!router.query.preview;

  const { data } = usePreviewSubscription(ds_query, {
    params: { slug: props?.slug },
    initialData: props.page,
    enabled: enablePreview,
  });

  const { data: sidebar } = usePreviewSubscription(sidebarQuery, {
    initialData: props.sidebar,
    enabled: enablePreview,
  });

  slugger.reset();

  if (!router.isFallback && !data?.slug) {
    return <Error statusCode={404} />;
  }

  if (router.isFallback) {
    return <div>Laster...</div>;
  }

  // TODO: Move sidebar to context?
  return (
    <>
      {enablePreview && <PreviewBanner slug={props?.slug} />}
      <div>
        <TemplatePicker data={data} sidebar={sidebar} />
      </div>
    </>
  );
};

const query = `*[_type in ["ds_component_page", "ds_article_page", "ds_tabbed_article_page"]]{ _type, 'slug': slug.current }`;

export const getStaticPaths = async () => {
  const documents: any[] | null = await getClient(false).fetch(query);
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
      case "ds_tabbed_article_page":
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
    sidebar;
  };
  revalidate: number;
}

const ds_query = `*[slug.current match $slug][0]
{
  "slug": slug.current,
	...,
}`;

const sidebarQuery = `
*[_id == 'navigation_designsystem'][0] {
  "sidebar": sidemenu[]{
   ...,
   link_ref->{_id, slug},
    dropdown[]{
      ...,
       link_ref->{_id, slug},
      dropdown[]{
        ...,
        link_ref->{_id, slug},
      }
    }
  }
 }
`;

export const getStaticProps = async ({
  params: { slug },
  preview,
}): Promise<StaticProps> => {
  const joinedSlug = slug.slice(0, 2).join("/");

  const enablePreview = !!preview || isDevelopment();
  const page = await getClient(enablePreview).fetch(ds_query, {
    slug: "designsystem/" + joinedSlug,
  });

  const sidebar = await getClient(true).fetch(sidebarQuery);
  return {
    props: {
      page,
      preview: enablePreview,
      slug: joinedSlug,
      sidebar: sidebar,
    },
    revalidate: 60,
  };
};

export default PagePicker;
