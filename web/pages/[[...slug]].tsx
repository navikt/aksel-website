import client from "../client";
import { useRouter } from "next/router";
import groq from "groq";
import { dsPageSpec, fetchAllDsSlugs, fetchDsPage, SanityDsPage } from "../sanity-types";

interface PageProps {
  article: SanityDsPage;
}

const ArticlePage = (props: PageProps) => {
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
      <h1>{article.title}</h1>
      <span>{article.slug}</span>
    </div>
  );
};

export interface StaticPathProps {
  paths: { params: { slug: string | string[] } }[];
  fallback: boolean;
}

export const getStaticPaths = async (): Promise<StaticPathProps> => {
  const articleSlugs = await fetchAllDsSlugs();
  return {
    paths: articleSlugs
      ?.map((page) => {
        return { params: { slug: page.slug.split("/") } };
      })
      .flat(),
    fallback: false,
  };
};

interface StaticProps {
  props: {
    article: SanityDsPage;
  };
  revalidate: number;
}

export const getStaticProps = async ({ params: { slug } }): Promise<StaticProps> => {
  const article = await fetchDsPage(slug.join("/"));
  return {
    props: { article },
    revalidate: 60,
  };
};

export default ArticlePage;
