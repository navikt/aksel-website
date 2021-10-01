import { useRouter } from "next/router";
import { usePreviewSubscription, getClient } from "../../lib";
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
}): JSX.Element => {
  const router = useRouter();
  const enablePreview = !!props.preview || !!router.query.preview;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setPageData] = useContext(PagePropsContext);

  const { data } = usePreviewSubscription(ds_query, {
    params: { slug: props?.slug },
    initialData: props.page,
    enabled: enablePreview,
  });

  /* const { data: sidebar } = usePreviewSubscription(sidebarQuery, {
    initialData: props.sidebar,
    enabled: enablePreview,
  }); */

  /* useEffect(() => {
    setPageData({ ...props, sidebar });
  }, [sidebar]); */

  useEffect(() => {
    setPageData({ ...props, page: data });
  }, [data]);

  return (
    <>
      {enablePreview && <PreviewBanner />}
      <TemplatePicker data={data} /* sidebar={sidebar} */ />
    </>
  );
};

const query = `*[_type in ["ds_component_page", "ds_article_page", "ds_tabbed_article_page"]]{ _type, 'slug': slug.current }`;

export const getStaticPaths = async (): Promise<{
  fallback: boolean;
  paths: { params: { slug: string[] } }[];
}> => {
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
    /* sidebar; */
  };
  revalidate: number;
}

const ds_query = `*[slug.current match $slug][0]
{
  ...,
  "slug": slug.current,
	usage[]{
    ...,
    _type == "code_example_ref" =>{
    	"ref": @.ref->
  	}
  },
  design[]{
      ...,
      _type == "code_example_ref" =>{
        "ref": @.ref->
      }
  },
  development[]{
      ...,
      _type == "code_example_ref" =>{
        "ref": @.ref->
      }
  },
  accessibility[]{
      ...,
      _type == "code_example_ref" =>{
        "ref": @.ref->
      }
  },
}`;

/* const sidebarQuery = `
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
`; */

export const getStaticProps = async ({
  params: { slug },
  preview,
}: {
  params: { slug: string[] };
  preview: boolean;
}): Promise<StaticProps> => {
  const joinedSlug = slug.slice(0, 2).join("/");

  const enablePreview = !!preview || isDevelopment();
  const page = await getClient(enablePreview).fetch(ds_query, {
    slug: "designsystem/" + joinedSlug,
  });

  /* const sidebar = await getClient(true).fetch(sidebarQuery); */
  return {
    props: {
      page,
      preview: enablePreview,
      slug: joinedSlug,
      /* sidebar: sidebar, */
    },
    revalidate: 60,
  };
};

export default PagePicker;
