import { useRouter } from "next/router";
import {
  usePreviewSubscription,
  getClient,
  gpDocuments,
  gpDocumentBySlug,
  isDraftQuery,
} from "../../lib";
import { PreviewBanner, LayoutPicker } from "../../components";
import { useContext, useEffect, useState } from "react";
import { PagePropsContext } from "../_app";
import { GpArticlePage } from "../../lib/autogen-types";

const PagePicker = (props: {
  slug?: string;
  page: GpArticlePage;
  sidebar: any;
}): JSX.Element => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { pageProps, setPageData } = useContext(PagePropsContext);

  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    setIsPreview(!!router.query.preview);
  }, [router.query]);

  const { data } = usePreviewSubscription(gpDocumentBySlug, {
    params: { slug: "god-praksis/" + props?.slug },
    initialData: props.page,
    enabled: isPreview,
  });

  useEffect(() => {
    setPageData({ ...pageProps, page: data });
  }, [data]);

  return (
    <>
      {isPreview && <PreviewBanner />}
      <LayoutPicker title="God Praksis" data={data} />
    </>
  );
};

export const getStaticPaths = async (): Promise<{
  fallback: string;
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
    fallback: "blocking",
  };
};

interface StaticProps {
  props: {
    page: GpArticlePage;
    slug: string;
    isDraft: boolean;
    validPath: boolean;
  };
  revalidate: number;
}

export const getStaticProps = async ({
  params: { slug },
}: {
  params: { slug: string[] };
}): Promise<StaticProps> => {
  const joinedSlug = slug
    .filter((x) => x !== "god-praksis")
    .slice(0, 2)
    .join("/");

  const client = getClient(false);

  const page = await client.fetch(gpDocumentBySlug, {
    slug: "god-praksis/" + joinedSlug,
  });

  const isDraft = await client.fetch(isDraftQuery, {
    slug: "god-praksis/" + joinedSlug,
  });

  return {
    props: {
      page,
      slug: joinedSlug,
      isDraft: isDraft.length === 0,
      validPath: !!page,
    },
    revalidate: 30,
  };
};

export default PagePicker;
