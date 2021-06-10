/* import client from "../client"; */
import { useRouter } from "next/router";
import groq from "groq";
import { SanityBlockContent } from "../components/SanityBlockContent";
import { Title } from "@navikt/ds-react";
import { getClient } from "../lib/sanity.server";

const ArticlePage = (props) => {
  const router = useRouter();

  const { article } = props;
  if (router.isFallback) {
    return <div>Laster...</div>;
  }

  if (!router.isFallback && !article) {
    return <div>404 ERROR</div>;
  }

  return (
    <div>
      <Title spacing level={1} size="2xl">
        {article.title}
      </Title>
      <SanityBlockContent blocks={article.body} />
    </div>
  );
};

export interface StaticPathProps {
  paths: { params: { slug: string | string[] } }[];
  fallback: boolean;
}

const query = `*[_type == "designsystempage"]{ 'slug': slug.current }`;

export const getStaticPaths = async ({ preview = false }): Promise<StaticPathProps> => {
  const articleSlugs = await getClient(preview).fetch(query);
  return {
    paths:
      articleSlugs?.map((page) => {
        return { params: { slug: page.slug.split("/") } };
      }) || [],
    fallback: false,
  };
};

interface StaticProps {
  props: {
    article;
  };
  revalidate: number;
}

const ds_query = `*[_type == "designsystempage" && slug.current == $slug][0]
  {
    "id": _id,
    "title": title,
    "slug": slug.current,
    "body": body
  }`;

export const getStaticProps = async ({
  params: { slug },
  preview,
}): Promise<StaticProps> => {
  const article = await getClient(preview).fetch(ds_query, { slug: slug.join("/") });

  return {
    props: { article },
    revalidate: 60,
  };
};

export default ArticlePage;
