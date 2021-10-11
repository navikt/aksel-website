import { useRouter } from "next/router";
import {
  usePreviewSubscription,
  getClient,
  gpDocuments,
  gpDocumentBySlug,
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
}): JSX.Element => {
  const router = useRouter();
  const enablePreview = !!props.preview || !!router.query.preview;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setPageData] = useContext(PagePropsContext);

  const { data } = usePreviewSubscription(gpDocumentBySlug, {
    params: { slug: "god-praksis/" + props?.slug },
    initialData: props.page,
    enabled: enablePreview,
  });

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

export const getStaticPaths = async (): Promise<{
  fallback: boolean;
  paths: { params: { slug: string[] } }[];
}> => {
  const documents: any[] | null = await getClient(false).fetch(gpDocuments);
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

export const getStaticProps = async ({
  params: { slug },
  preview,
}: {
  params: { slug: string[] };
  preview: boolean;
}): Promise<StaticProps> => {
  const joinedSlug = slug.slice(0, 2).join("/");

  const enablePreview = !!preview || isDevelopment();
  const page = await getClient(enablePreview).fetch(gpDocumentBySlug, {
    slug: "god-praksis/" + joinedSlug,
  });

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
