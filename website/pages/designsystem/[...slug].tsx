import { useRouter } from "next/router";
import Error from "next/error";
import { getClient } from "../../lib/sanity.server";
import { usePreviewSubscription } from "../../lib/santiy";
import { isDevelopment } from "../../src/util";
import PreviewBanner from "../../components/PreviewBanner";
import styled from "styled-components";
import TemplatePicker from "../../components/TemplatePicker";

const Layout = styled.div`
  padding-left: 300px;
`;

const PagePicker = (props) => {
  const router = useRouter();
  const enablePreview = !!props.preview || !!router.query.preview;

  const { data } = usePreviewSubscription(ds_query, {
    params: { slug: props?.slug },
    initialData: props.page,
    enabled: enablePreview,
  });

  if (!router.isFallback && !data?.slug) {
    return <Error statusCode={404} />;
  }

  if (router.isFallback) {
    return <div>Laster...</div>;
  }

  return (
    <>
      {enablePreview && <PreviewBanner slug={props?.slug} />}
      <Layout>
        <TemplatePicker data={data} />
      </Layout>
    </>
  );
};

export interface StaticPathProps {
  paths: { params: { slug: string | string[] } }[];
  fallback: boolean;
}

const query = `*[_type match "ds_*"]{ "type": _type, 'slug': slug.current }`;

export const getStaticPaths = async (): Promise<StaticPathProps> => {
  const documents = await getClient(false).fetch(query);
  console.log(documents);

  return {
    paths:
      documents?.map((page) => {
        return { params: { slug: page.slug.split("/") } };
      }) || [],
    fallback: true,
  };
};

interface StaticProps {
  props: {
    page;
    preview: boolean;
    slug: string;
  };
  revalidate: number;
}

const ds_query = `*[_type match "ds_*" && slug.current == "/designsystem/komponent/button"][0]
{
  "slug": slug.current,
  ...
}`;

export const getStaticProps = async ({
  params: { slug },
  preview,
}): Promise<StaticProps> => {
  const enablePreview = !!preview || isDevelopment();
  const page = await getClient(enablePreview).fetch(ds_query, {
    slug: slug.join("/"),
  });

  return {
    props: { page, preview: enablePreview, slug: slug.join("/") },
    revalidate: 60,
  };
};

export default PagePicker;
