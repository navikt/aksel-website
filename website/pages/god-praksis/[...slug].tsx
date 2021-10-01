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

const query = `*[_type in ["gp_article_page"]]{ _type, 'slug': slug.current }`;

export const getStaticPaths = async (): Promise<{
  fallback: boolean;
  paths: { params: { slug: string[] } }[];
}> => {
  const documents: any[] | null = await getClient(false).fetch(query);
  const paths = [];

  documents?.forEach((page) => {
    if (!page.slug) {
      return null;
    }
    const slug = page.slug.split("/");

    paths.push({
      params: {
        slug,
      },
    });
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
}`;

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
    slug: "god-praksis/" + joinedSlug,
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
