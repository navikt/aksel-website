import { useRouter } from "next/router";
import {
  usePreviewSubscription,
  getClient,
  gpDocuments,
  gpDocumentBySlug,
  isDraftQuery,
} from "../../lib";
import { PreviewBanner, LayoutPicker } from "../../components";
import React, { useContext, useEffect, useState } from "react";
import { PagePropsContext } from "../_app";
import { GpArticlePage } from "../../lib/autogen-types";
import * as Sc from "../../components";
import GodPraksisHeader from "../../components/layout/header/GodPraksisHeader";
const Page = (props: {
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

Page.getLayout = (page) => {
  return (
    <>
      <Sc.SkipLink href="#hovedinnhold" tab-index={-1}>
        Hopp til innhold
      </Sc.SkipLink>
      <GodPraksisHeader />
      <Sc.SidebarMain>
        <Sc.MainFooter>
          <Sc.Main tabIndex={-1} id="hovedinnhold">
            {page}
          </Sc.Main>
        </Sc.MainFooter>
      </Sc.SidebarMain>
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
    page.slug &&
      paths.push({
        params: {
          slug: page.slug.split("/"),
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
    revalidate: 10,
  };
};

export default Page;
