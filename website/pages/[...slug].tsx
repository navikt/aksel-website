/* import client from "../client"; */
import { useRouter } from "next/router";
import Error from "next/error";
import { SanityBlockContent } from "../components/SanityBlockContent";
import { Title } from "@navikt/ds-react";
import { getClient } from "../lib/sanity.server";
import { usePreviewSubscription } from "../lib/santiy";
import { isDevelopment } from "../src/util";
import PreviewBanner from "../components/previewBanner";
import styled from "styled-components";
import PageBuilder from "../components/Pagebuilder";
import moment from "moment";

const Div = styled.div`
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding-top: 4rem;
`;

const ArticlePage = (props) => {
  const router = useRouter();
  const enablePreview = !!props.preview || !!router.query.preview;

  const { data } = usePreviewSubscription(ds_query, {
    params: { slug: props?.slug },
    initialData: props.article,
    enabled: enablePreview,
  });

  if (!router.isFallback && !data?.slug) {
    return <Error statusCode={404} />;
  }

  if (router.isFallback) {
    return <div>Laster...</div>;
  }
  const lastUpdate = new Date(data.last_update);

  return (
    <>
      {enablePreview && <PreviewBanner slug={props?.slug} />}
      <Div>
        <Title spacing level={1} size="2xl">
          {data.title}
        </Title>
        <span>{`${lastUpdate.toLocaleDateString("en-GB")} (${moment(
          data.last_update
        ).fromNow()})`}</span>
        {/* <SanityBlockContent blocks={data.body} /> */}
        <PageBuilder sections={data.sections} />
      </Div>
    </>
  );
};

export interface StaticPathProps {
  paths: { params: { slug: string | string[] } }[];
  fallback: boolean;
}

const query = `*[_type == "ds_page"]{ 'slug': slug.current }`;

export const getStaticPaths = async (): Promise<StaticPathProps> => {
  const articleSlugs = await getClient(false).fetch(query);
  return {
    paths:
      articleSlugs?.map((page) => {
        return { params: { slug: page.slug.split("/") } };
      }) || [],
    fallback: true,
  };
};

interface StaticProps {
  props: {
    article;
    preview: boolean;
    slug: string;
  };
  revalidate: number;
}

const ds_query = `*[_type == "ds_page" && slug.current == $slug][0]
  {
    "id": _id,
    "last_update": _updatedAt,
    "title": title,
    "slug": slug.current,
    "sections": pageBuilder
  }`;

export const getStaticProps = async ({
  params: { slug },
  preview,
}): Promise<StaticProps> => {
  const enablePreview = !!preview || isDevelopment();
  const article = await getClient(enablePreview).fetch(ds_query, {
    slug: slug.join("/"),
  });

  return {
    props: { article, preview: enablePreview, slug: slug.join("/") },
    revalidate: 60,
  };
};

export default ArticlePage;
