import { useRouter } from "next/router";
import Error from "next/error";
import { getClient } from "../../lib/sanity.server";
import { usePreviewSubscription } from "../../lib/santiy";
import { isDevelopment } from "../../src/util";
import PreviewBanner from "../../components/PreviewBanner";
import styled from "styled-components";
import TemplatePicker from "../../components/templating/TemplatePicker";
import slugger from "../../components/slugger";

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

  slugger.reset();

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

const query = `*[_type == "ds_component_page"]{ _type, 'slug': slug.current }`;

export const getStaticPaths = async () => {
  const documents: any[] | null = await getClient(false).fetch(query);
  const paths = [];
  const tabs = ["design", "utvikling", "tilgjengelighet"];

  documents?.forEach((page) => {
    if (!page.slug) {
      return null;
    }
    const slug = page.slug.split("/");

    if (page._type === "ds_component_page") {
      tabs.forEach((tab) => {
        paths.push({
          params: {
            slug: [...slug, tab],
          },
        });
      });
    }

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
  };
  revalidate: number;
}

const ds_query = `*[slug.current match $slug][0]
{
  "slug": slug.current,
	...,
  "page_linker": page_linker{
  	"next": next->{"slug":slug.current},
  	"previous": previous->{"slug":slug.current}
	}
}`;

export const getStaticProps = async ({
  params: { slug },
  preview,
}): Promise<StaticProps> => {
  let joinedSlug = (slug[0] === "komponent" ? slug.slice(0, 2) : slug).join(
    "/"
  );

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
