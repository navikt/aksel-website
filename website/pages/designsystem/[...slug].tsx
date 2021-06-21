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

const query = `*[_type == "ds_component_page"]{ "type": _type, 'slug': slug.current }`;

export const getStaticPaths = async () => {
  const documents = await getClient(false).fetch(query);
  const paths = [];
  const tabs = ["design", "kode", "tilgjengelighet"];

  documents?.map((page) => {
    if (!page.slug) {
      return null;
    }
    const slug = page.slug.split("/");

    paths.push({
      params: {
        slug,
      },
    });

    if ((page._type = "ds_component_page")) {
      paths.push(
        ...tabs.map((tab) => {
          return {
            params: {
              slug: [...slug, tab],
            },
          };
        })
      );
    }
  }) || [];

  /* console.log(JSON.stringify(paths, null, 1)); */
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
  };
  revalidate: number;
}

const ds_query = `*[slug.current match $slug][0]
{
  "slug": slug.current,
  ...
}`;

export const getStaticProps = async ({
  params: { slug },
  preview,
}): Promise<StaticProps> => {
  let joinedSlug = slug.join("/");

  if (slug[0] === "komponent" && slug.length > 2) {
    joinedSlug = slug.slice(0, -1).join("/");
  }

  const enablePreview = !!preview || isDevelopment();
  const page = await getClient(enablePreview).fetch(ds_query, {
    slug: "designsystem/" + joinedSlug,
  });

  return {
    props: {
      page,
      preview: enablePreview,
      slug: joinedSlug,
    },
    revalidate: 60,
  };
};

export default PagePicker;
